// app/[...slug]/page.tsx
import { notFound } from "next/navigation";
import { wpQuery } from "@/lib/wpclients";

const GET_PAGE = /* GraphQL */ `
	query PageByUri($uri: String!) {
		nodeByUri(uri: $uri) {
			... on Page {
				id
				title
				content
			}
		}
	}
`;

export const revalidate = 60; // ISR

export default async function WpPage({
	params,
}: {
	params: { slug?: string[] };
}) {
	// Bygg WP-URI: "/" (startsida) eller "/the-firm" osv.
	const uri = "/" + (params.slug?.join("/") ?? "");

	const data = await wpQuery<{
		nodeByUri: null | { title: string; content: string };
	}>(GET_PAGE, { uri });

	if (!data.nodeByUri) return notFound();

	return (
		<main className="container">
			<h1 dangerouslySetInnerHTML={{ __html: data.nodeByUri.title }} />
			<article dangerouslySetInnerHTML={{ __html: data.nodeByUri.content }} />
		</main>
	);
}

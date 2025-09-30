import { wpQuery } from "@/lib/wpclients";
import { notFound } from "next/navigation";

type Data = { postBy: { title: string; content: string } | null };

export default async function PostPage({
	params,
}: {
	params: { slug: string };
}) {
	const data = await wpQuery<Data>(
		/* GraphQL */ `
			query PostBySlug($slug: String!) {
				postBy(slug: $slug) {
					title
					content
				}
			}
		`,
		{ slug: params.slug }
	);

	if (!data.postBy) return notFound();

	return (
		<article style={{ padding: 24 }}>
			<h1>{data.postBy.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: data.postBy.content }} />
		</article>
	);
}

export const revalidate = 60;

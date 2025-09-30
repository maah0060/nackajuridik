// app/om-oss/page.tsx
import { wpQuery, GET_PAGE } from "@/lib/wpclients";

const QUERY = /* GraphQL */ `
	query PageBySlug($slug: ID!) {
		page(id: $slug, idType: URI) {
			title
			content
			seo: seo {
				title
				metaDesc
			} # om du använder RankMath/Yoast (via deras WPGraphQL-ext)
		}
	}
`;

export const revalidate = 60; // ISR: bygg statiskt, uppdatera var 60s

export async function generateMetadata() {
	// valfritt: plocka SEO från WP
	try {
		const data = await wpQuery<{
			page: { seo?: { title?: string; metaDesc?: string } };
		}>(QUERY, { slug: "om-oss" });
		return {
			title: data.page?.seo?.title ?? "Om oss",
			description: data.page?.seo?.metaDesc,
		};
	} catch {
		return { title: "Om oss" };
	}
}

export default async function OmOssPage() {
	const data = await wpQuery<{ page: { title: string; content: string } }>(
		GET_PAGE,
		{ slug: "om-oss" }
	);
	return <article dangerouslySetInnerHTML={{ __html: data.page.content }} />;
}

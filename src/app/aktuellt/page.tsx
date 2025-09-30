import { wpQuery } from "@/lib/wpclients";

type Post = { title: string; slug: string };
type Data = { posts: { nodes: Post[] } };

export default async function Page() {
	const data = await wpQuery<Data>(`
    { posts(first: 10) { nodes { title slug } } }
  `);

	return (
		<div>
			<h1>Aktuellt</h1>
			<ul>
				{data.posts.nodes.map((p) => (
					<li key={p.slug}>
						<a href={`/posts/${p.slug}`}>{p.title}</a>
					</li>
				))}
			</ul>
		</div>
	);
}

// Global ISR för denna sida (kan sättas per fetch också)
export const revalidate = 60;

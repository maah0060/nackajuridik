// src/lib/wpClient.ts
import "server-only";
import type { DocumentNode } from "graphql";
import { print } from "graphql";

export const WP_ENDPOINT =
	process.env.NEXT_PUBLIC_WPGRAPHQL_ENDPOINT ??
	"https://nackajuridik.se/graphql";

type Vars = Record<string, unknown>;
type QueryInput = string | DocumentNode;

export async function wpQuery<T>(query: QueryInput, variables: Vars = {}) {
	const queryString = typeof query === "string" ? query : print(query);
	if (!queryString?.trim()) throw new Error("wpQuery: tom 'query'");

	const res = await fetch(WP_ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query: queryString, variables }),
		next: { revalidate: 60 },
	});

	if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
	const json = await res.json();
	if (json.errors?.length)
		throw new Error("GraphQL errors: " + JSON.stringify(json.errors));
	return json.data as T;
}

// valfri exempel-query
export const GET_PAGE = /* GraphQL */ `
	query PageBySlug($slug: ID!) {
		page(id: $slug, idType: URI) {
			title
			content
		}
	}
`;

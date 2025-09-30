import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const slug = url.searchParams.get("slug") || "";
	// validera secret här om du vill
	return NextResponse.redirect(new URL(`/posts/${slug}`, url), {
		headers: {
			"Set-Cookie": `__prerender_bypass=1; Path=/; HttpOnly; SameSite=Lax`,
		},
	});
}

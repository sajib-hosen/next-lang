import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const LANG_COOKIE_NAME = "next_lang";
export const LANG_PARAMS = "ln";

// middleware
export async function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl;
    const searchParams = new URLSearchParams(nextUrl.search);
    const lang = request.cookies.get(LANG_COOKIE_NAME);

    if (lang?.value && !searchParams.get(LANG_PARAMS)) {
        nextUrl.searchParams.append(LANG_PARAMS, lang.value);
        return NextResponse.redirect(new URL(nextUrl, request.url));
    } else if (lang?.value && searchParams.get(LANG_PARAMS) !== lang.value) {
        nextUrl.searchParams.delete(LANG_PARAMS);
        nextUrl.searchParams.append(LANG_PARAMS, lang.value);
        return NextResponse.redirect(new URL(nextUrl, request.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};

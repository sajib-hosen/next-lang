"use server";

import { LANG_COOKIE_NAME, LANG_PARAMS } from "@/middleware";
import { cookies } from "next/headers";

export const getServerVerbs = async () => {
    return {
        langCookiesName: LANG_COOKIE_NAME,
        langParams: LANG_PARAMS,
    };
};

export async function setLangCookie(langKey: string) {
    cookies().set({
        name: LANG_COOKIE_NAME,
        value: langKey,
        httpOnly: true,
        path: "/",
    });
}

export async function getLangCookie() {
    const cookie = cookies().get(LANG_COOKIE_NAME);
    return cookie?.value;
}

export async function deleteCookie(name: string) {
    const cookie = cookies().delete(name);
    return cookie;
}

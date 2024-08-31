import {
    getLangCookie,
    getServerVerbs,
    setLangCookie,
} from "@/app/lang_utils/handle.cookies";
import { MyObjectKeyTypes } from "@/data/lang.data";
// import { LANG_COOKIE_NAME, LANG_PARAMS } from "@/middleware";

export const changeLang = async (langKey: string) => {
    await setLangCookie(langKey);
};

export const getLanguage = async (): Promise<MyObjectKeyTypes | undefined> => {
    return (await getLangCookie()) as MyObjectKeyTypes | undefined;
};

export const getVerbs = async () => {
    return await getServerVerbs();
};

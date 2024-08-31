// import { LANG_PARAMS } from "@/app/lang_utils/handle.cookies";
import { MyObjectKeyTypes, langKeys } from "@/data/lang.data";
import { changeLang, getVerbs } from "@/utils/change.lang";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
// import {languages } from "./app/i18n/settings";

interface SearchQueryObjTy {
    [key: string]: string;
}

const useMyRouter = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const updateQueryString = (name: string, value: string) => {
        if (name && value) {
            router.push(pathname + "?" + createQueryString(name, value));
        } else if (name && !value) {
            deleteQueryParams(name);
        }
    };

    const updateQueryObject = (qObj: SearchQueryObjTy) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const property in qObj) {
            params.set(property, qObj[property]);
        }
        router.push(pathname + "?" + params.toString());
    };

    const clearAllQueryString = () => {
        router.push(pathname);
    };

    const getQueryParams = (key: string) => {
        const value = searchParams.get(key);
        if (value) return value;
        else return "";
    };

    const deleteQueryParams = (key: string) => {
        const nextSearchParams = new URLSearchParams(searchParams.toString());
        nextSearchParams.delete(key);
        router.replace(`${pathname}?${nextSearchParams}`);
    };

    const modifyQueryParams = (
        deleteKeys: string[],
        updateObject: SearchQueryObjTy
    ) => {
        const nextSearchParams = new URLSearchParams(searchParams.toString());
        if (deleteKeys.length) {
            deleteKeys.forEach((k) => {
                nextSearchParams.delete(k);
            });
        }
        if (Object.keys(updateObject).length) {
            for (const property in updateObject) {
                nextSearchParams.set(property, updateObject[property]);
            }
        }
        router.replace(`${pathname}?${nextSearchParams}`);
    };

    const getHash = () => {
        return window.location.hash;
    };

    const setHash = (hashValue: string) => {
        window.location.hash = `#${hashValue}`;
    };

    const switchLanguage = async (langKey: MyObjectKeyTypes) => {
        if (langKeys.includes(langKey)) {
            await changeLang(langKey);
            const { langParams, langCookiesName } = await getVerbs();
            modifyQueryParams([langParams], { [langParams]: langKey });
            window.localStorage.setItem(
                langCookiesName,
                JSON.stringify(langKey)
            );
        } else {
            console.log("the language key is not in the list.");
        }
    };

    const setDefaultLan = async () => {
        const { langParams, langCookiesName } = await getVerbs();
        const langKey = window.localStorage.getItem(langCookiesName);
        if (langKey) {
            console.log("set from local");
            const localLn: MyObjectKeyTypes = JSON.parse(langKey);
            switchLanguage(localLn);
        } else {
            console.log("set from default");
            const brawserLang = window.navigator.language;
            const defLan: string[] = brawserLang.split("-");
            const ln = searchParams.get(langParams);
            if (ln) return;
            switchLanguage(defLan[0] as MyObjectKeyTypes);
        }
    };

    // Run from the root
    // set default language from brawser
    React.useEffect(() => {
        setDefaultLan();
    }, []);

    return {
        createQueryString,
        updateQueryString,
        clearAllQueryString,
        getQueryParams,
        deleteQueryParams,
        updateQueryObject,
        modifyQueryParams,
        getHash,
        setHash,
        switchLanguage,
    };
};

export default useMyRouter;

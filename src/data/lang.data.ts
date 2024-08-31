const ch = {
    name: "中国",
    phone: "零一四七",
};

const bd = {
    name: "বাংলা",
    phone: "১১৩৮৮৫",
};

const en = {
    name: "english",
    phone: "09876",
};

const pk = {
    name: "اردو",
    phone: "۰ ۱ ۲ ۳ ۴",
};

const hi = {
    name: "हिन्दुई",
    phone: "एक, दो, तीन, चार",
};

export const defaultLn = "en";

export const langs = {
    ch,
    en,
    bd,
    pk,
    hi,
} as const;

export type EachObj = typeof en;

export type MyObjectKeyTypes = keyof typeof langs;

export const getValue = (
    ln: MyObjectKeyTypes = defaultLn,
    key: keyof EachObj
) => {
    return langs[ln][key];
};

export const langKeys = Object.keys(langs);

export interface LangNav {
    key: MyObjectKeyTypes;
    label: string;
}

export const langNav: LangNav[] = [
    {
        key: "en",
        label: "English",
    },
    {
        key: "ch",
        label: "Chinese",
    },
    {
        key: "bd",
        label: "Bangla",
    },
    {
        key: "pk",
        label: "Urdu",
    },
    {
        key: "hi",
        label: "Hindi",
    },
];

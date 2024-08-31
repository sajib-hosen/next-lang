import BaseHome from "@/components/BaseHome/BaseHome";
import { MyObjectKeyTypes } from "@/data/lang.data";

interface Props {
    searchParams?: { ln: MyObjectKeyTypes };
}

export default async function Home({ searchParams }: Props) {
    return <BaseHome currentLn={searchParams?.ln} />;
}

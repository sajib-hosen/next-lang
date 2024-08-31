"use client";

import { MyObjectKeyTypes, getValue } from "@/data/lang.data";
import useMyRouter from "@/hooks/useMyRouters.hook";
import React from "react";

interface BaseHomeProps {
    currentLn?: MyObjectKeyTypes;
}

const BaseHome: React.FC<BaseHomeProps> = ({ currentLn }) => {
    const { switchLanguage } = useMyRouter();

    return (
        <div className=" space-x-4">
            <div className=" flex justify-center items-center ">
                <div className=" space-x-4 p-2 ">
                    <button onClick={() => switchLanguage("en")}>
                        English
                    </button>
                    <button onClick={() => switchLanguage("ch")}>
                        Chinese
                    </button>
                    <button onClick={() => switchLanguage("bd")}>Bangla</button>
                    <button onClick={() => switchLanguage("pk")}>Urdu</button>
                    <button onClick={() => switchLanguage("hi")}>Hindi</button>
                </div>
            </div>

            <div className=" flex justify-center p-10">
                <div className=" text-center">
                    <p>{getValue(currentLn, "name")}</p>
                    <p>{getValue(currentLn, "phone")}</p>
                </div>
            </div>
        </div>
    );
};

export default BaseHome;

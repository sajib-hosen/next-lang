"use client";

import { MyObjectKeyTypes, getValue, langNav } from "@/data/lang.data";
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
                    {langNav.length
                        ? langNav.map((e) => (
                              <button
                                  className={`${
                                      currentLn === e.key ? "border-b" : ""
                                  }`}
                                  key={e.key}
                                  onClick={() => switchLanguage(e.key)}
                              >
                                  {e.label}
                              </button>
                          ))
                        : null}
                </div>
            </div>

            <div className=" flex justify-center p-10 text-3xl">
                <div className=" text-center">
                    <p>{getValue(currentLn, "name")}</p>
                    <p>{getValue(currentLn, "phone")}</p>
                </div>
            </div>
        </div>
    );
};

export default BaseHome;

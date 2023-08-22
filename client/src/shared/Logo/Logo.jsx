import React from "react";
import logo from "./assets/logo4.svg";
import { AnimationUnderline } from "../AnimationUnderline/AnimationUnderline";

export const Logo = () => {
    return (
        <div className="group h-8 w-10 md:w-32 lg:w-44 flex justify-center items-center">
            <div className="transition-all cursor-pointer gap-3 lg:group-hover:gap-1 flex justify-center items-end">
                <img
                    className="transition-all h-7 hover:scale-105 md:group-hover:h-6"
                    src={logo}
                    alt=""
                />
                <h1 className="group-hover:tracking-wide hidden md:block text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
                    <AnimationUnderline>Quote it</AnimationUnderline>
                </h1>
                <img
                    className="transition-all h-6 group-hover:h-7 hidden lg:block"
                    src={logo}
                    alt=""
                />
            </div>
        </div>
    );
};

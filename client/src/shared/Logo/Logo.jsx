import React from "react";
import logo from "./assets/logo4.svg";
import { AnimationUnderline } from "../AnimationUnderline/AnimationUnderline";

export const Logo = () => {
    return (
        <div className="group flex lg:justify-center items-center w-44">
            <div className="transition-all cursor-pointer gap-3 lg:group-hover:gap-1 flex justify-center items-end">
                <img className="h-7 md:group-hover:h-6" src={logo} alt="" />
                <h1 className="group-hover:tracking-wide hidden md:block text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
                    <AnimationUnderline>Quote it</AnimationUnderline>
                </h1>
                <img
                    className="h-6 group-hover:h-7 hidden lg:block"
                    src={logo}
                    alt=""
                />
            </div>
        </div>
    );
};

import React from "react";

export const RoundButton = ({ children, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="transition-all flex justify-center items-center w-10 h-10 bg-white hover:bg-gray-50 hover:scale-105 rounded-2xl cursor-pointer shadow-sm"
        >
            {children}
        </div>
    );
};

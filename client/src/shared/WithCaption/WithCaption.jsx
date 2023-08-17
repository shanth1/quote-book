import React from "react";

export const WithCaption = ({ children, sizeStyle, caption }) => {
    return (
        <div className="group">
            <div className={sizeStyle}>
                <div className="transition-all hover:scale-110">{children}</div>
            </div>
            <div className="flex justify-center">
                <div className="overflow-hidden flex justify-center absolute w-22">
                    <div className="pt-1 transition-all translate-y-[-100%] group-hover:translate-y-0">
                        {caption}
                    </div>
                </div>
            </div>
        </div>
    );
};

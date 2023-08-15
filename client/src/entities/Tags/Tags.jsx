import React from "react";
import { getColorFromOption } from "../../data/colorOptions";

export const Tags = ({ tags }) => {
    return (
        <div className="flex transition-all duration-200 justify-center items-center gap-1 group-hover:gap-2">
            {tags.map((tag) => (
                <div
                    key={tag}
                    className={`w-2 h-2 transition-all shadow-[0px_0.5px_2px_-0.5px] rounded-full hover:scale-125 ${getColorFromOption(
                        tag,
                        true,
                    )}`}
                ></div>
            ))}
        </div>
    );
};

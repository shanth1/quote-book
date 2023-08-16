import React from "react";
import { getColorFromOption } from "../../data/colorOptions";
import { Tooltip } from "../../shared/Label/Components/Tooltip/Tooltip";

export const Tags = ({ tags }) => {
    return (
        <div className="flex transition-all duration-200 justify-center items-center gap-1 group-hover:gap-2">
            {tags.map((tag) => (
                <Tooltip message={tag}>
                    <div
                        key={tag}
                        className={`w-2 h-2 transition-all rounded-full hover:scale-125 ${getColorFromOption(
                            tag,
                            true,
                        )}`}
                    ></div>
                </Tooltip>
            ))}
        </div>
    );
};

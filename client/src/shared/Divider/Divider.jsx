import { classNames } from "../../utils/classNames";

export const Divider = ({ isVisual = false }) => {
    return (
        <div
            className={classNames(
                "h-4 md:h-6 lg:h-8",
                isVisual ? "border-gray-500 border-b-2" : "",
            )}
        ></div>
    );
};

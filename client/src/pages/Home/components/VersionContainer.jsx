import { classNames } from "../../../utils/classNames";

export const VersionContainer = ({ children, isCurrent = false }) => {
    return (
        <div
            className={classNames(
                "hover:scale-105 transition-all group flex flex-col items-center bg-white rounded-lg px-2 py-4 shadow-sm hover:bg-primary-50",
                isCurrent ? "border-[1px] border-primary-500" : "",
            )}
        >
            {children}
        </div>
    );
};

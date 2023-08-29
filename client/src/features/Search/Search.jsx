import Input from "../../shared/Input/Input";
import { classNames } from "../../utils/classNames";

export const Search = ({ visible }) => {
    return (
        <div
            className={classNames(
                "transition-all flex bg-white relative rounded-lg",
                visible ? "h-14 p-2 mb-3 md:mb-4" : "h-0 p-0",
            )}
        >
            <div className="overflow-hidden w-full flex gap-2">
                <Input placeholder="Search" />
            </div>
        </div>
    );
};

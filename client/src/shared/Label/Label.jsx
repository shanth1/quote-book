import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip } from "./Components/Tooltip/Tooltip";

const Label = ({ children, isActive = true, tooltipMessage }) => {
    return (
        <label
            className={`flex items-center mb-2 text-sm font-medium gap-1 ${
                isActive ? "text-gray-900" : "text-gray-400"
            } dark:text-white`}
        >
            {children}
            {tooltipMessage && (
                <Tooltip message={tooltipMessage}>
                    <AiOutlineQuestionCircle />
                </Tooltip>
            )}
        </label>
    );
};

export default Label;

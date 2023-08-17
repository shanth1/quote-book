import { BiCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";

export const CheckBox = ({ children, checked = false }) => {
    return (
        <div className="flex items-start gap-1">
            {checked ? (
                <BiSolidCheckboxChecked className="mt-0.5" size="20px" />
            ) : (
                <BiCheckbox className="mt-0.5" size="20px" />
            )}
            {children}
        </div>
    );
};

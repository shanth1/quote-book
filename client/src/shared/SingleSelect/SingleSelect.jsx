import { useState } from "react";
import Select from "react-tailwindcss-select";

export const SingleSelect = ({ options, state, setState }) => {
    let initialValues;
    state &&
        options.forEach((option) => {
            if (String(state) === option?.value) initialValues = option;
        });

    const [values, setValues] = useState(initialValues);

    const handleChange = (obj) => {
        setState(obj?.value || "");
        setValues(obj);
    };

    return (
        <Select
            value={values}
            onChange={handleChange}
            options={options}
            isClearable
            classNames={{
                menuButton: () =>
                    "flex h-10 rounded-lg text-sm text-gray-500 bg-gray-50 border border-gray-300 transition-all duration-200 focus:outline-none hover:border-gray-400 focus:border-primary-500",
                menu: "absolute rounded-lg z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                listItem: ({ isSelected }) =>
                    `block rounded-lg transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                            ? `text-white bg-primary-500`
                            : `text-gray-500 hover:bg-primary-100 hover:text-primary-500`
                    }`,
                tagItem: () =>
                    "flex items-center rounded-lg bg-primary-100 px-1 py-1 gap-0.5",
                tagItemText: "text-gray-600 text-sm",
                tagItemIconContainer:
                    "flex justify-center items-center hover:bg-red-300 rounded-md cursor-pointer px-0.5 py-0.5",
                tagItemIcon: "w-3 h-3",
            }}
        />
    );
};

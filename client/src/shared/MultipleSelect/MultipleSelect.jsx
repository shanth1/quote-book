import { useState } from "react";
import Select from "react-tailwindcss-select";

export const MultipleSelect = ({ options, state, setState }) => {
    const initialValues = [];
    state &&
        state.forEach((element) => {
            options.forEach((option) => {
                const group = option?.options;
                if (group) {
                    group.forEach((subOption) => {
                        if (element === subOption.value)
                            initialValues.push(subOption);
                    });
                } else {
                    if (element === option.value) initialValues.push(option);
                }
            });
        });
    const [values, setValues] = useState(
        initialValues.length ? initialValues : null,
    );

    const handleChange = (arr) => {
        const stateArray = [];
        arr &&
            arr.forEach((el) => {
                stateArray.push(el.value);
                return el.value;
            });
        setState(stateArray);
        setValues(arr);
    };
    return (
        <Select
            isMultiple
            searchInputPlaceholder="Find the option"
            noOptionsMessage="No options found ):"
            isSearchable
            isClearable
            value={values}
            onChange={handleChange}
            options={options}
            formatGroupLabel={(data) => (
                <div
                    className={`py-2 text-xs flex items-center justify-between`}
                >
                    <span className="font-bold">{data.label}</span>
                    <span className="bg-gray-200 h-5 p-1.5 flex items-center justify-center rounded-full">
                        {data.options.length}
                    </span>
                </div>
            )}
            classNames={{
                menuButton: () =>
                    "flex rounded-lg text-sm text-gray-500 bg-gray-50 border border-gray-300 transition-all duration-200 focus:outline-none hover:border-gray-400 focus:border-primary-500",
                menu: "absolute rounded-lg z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                listItem: ({ isSelected }) =>
                    `block rounded-lg transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                            ? `text-white bg-primary-500`
                            : `text-gray-500 hover:bg-primary-100 hover:text-primary-500`
                    }`,
                tagItem: () =>
                    "flex bg-primary-500 items-center rounded-lg px-1 py-1 gap-1",
                tagItemText: "text-white text-sm",
                tagItemIconContainer:
                    "flex text-gray-100 hover:text-white transition-all duration-200 justify-center items-center hover:bg-red-500 rounded-md cursor-pointer px-0.5 py-0.5",
                tagItemIcon: "w-3 h-3",
                list: "",
                listGroupLabel: "",
                closeIcon: "flex w-4 h-4",
                searchIcon:
                    "absolute px-0.5 py-0.5 w-6 h-5 top-3.5 left-3.5 border-left border-r border-gray-300",
                searchBox:
                    "flex transition duration-200 bg-gray-50 border border-gray-300 items-center w-full h-10 px-8 rounded-lg focus:outline-none focus:border-primary-500 hover:border-gray-500",
            }}
        />
    );
};

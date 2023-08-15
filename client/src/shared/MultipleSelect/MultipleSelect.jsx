import { useState } from "react";
import Select from "react-tailwindcss-select";
import { getColorFromOption } from "../../data/colorOptions";

export const MultipleSelect = ({ options, state, setState }) => {
    const initialValues = [];
    state &&
        state.forEach((element) => {
            options.forEach((option) => {
                if (element === option.value) initialValues.push(option);
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
            noOptionsMessage="No options found"
            isSearchable
            isClearable
            formatOptionLabel={(data) => {
                return (
                    <li
                        className={`block transition-all duration-200 px-2 py-2 rounded-lg cursor-pointer select-none truncate hover:${getColorFromOption(
                            data.label,
                            false,
                        )}`}
                    >
                        <div
                            onClick={() => {}}
                            className="flex items-center gap-2"
                        >
                            <div
                                className={`w-2 h-2 rounded-full ${getColorFromOption(
                                    data.label,
                                    true,
                                )}`}
                            ></div>
                            {data.label}
                        </div>
                    </li>
                );
            }}
            value={values}
            onChange={handleChange}
            options={options}
            classNames={{
                menuButton: (data) => {
                    return "flex rounded-lg text-sm text-gray-500 bg-gray-50 border border-gray-300 transition-all duration-200 focus:outline-none hover:border-gray-400 focus:border-primary-500";
                },
                menu: "absolute rounded-lg z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                tagItem: (data) =>
                    `flex ${getColorFromOption(
                        data.item.value,
                        true,
                    )} items-center rounded-lg pl-2 pr-1 py-1 gap-0.5`,
                tagItemText: "text-white text-sm",
                tagItemIconContainer:
                    "flex text-gray-100 hover:text-white hover:scale-110 transition-all duration-200 justify-center items-center hover:bg-black hover:bg-opacity-10 rounded-md cursor-pointer px-0.5 py-0.5",
                tagItemIcon: "w-3 h-3",
                closeIcon: "flex w-4 h-4",
                searchIcon:
                    "absolute px-0.5 py-0.5 w-6 h-5 top-3.5 left-3.5 border-left border-r border-gray-300",
                searchBox:
                    "flex transition duration-200 bg-gray-50 border border-gray-300 items-center w-full h-10 px-8 rounded-lg focus:outline-none focus:border-primary-500 hover:border-gray-500",
            }}
        />
    );
};

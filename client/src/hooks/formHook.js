import { useState } from "react";
import { getStandardFormattedValue } from "./utils/standardFormatting";

export const useForm = (submitCallback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const [previousSymbol, setPreviousSymbol] = useState();
    const [previousLength, setPreviousLength] = useState();
    const onChange = (event) => {
        const key = event.target.name;
        let value = event.target.value;
        const isRemove = previousLength > value.length;
        value = value.trimStart();

        switch (key) {
            case "year":
                break;
            case "image":
                break;
            case "title":
            case "mainIdea":
            case "description":
            case "authors":
            case "genres":
                value = getStandardFormattedValue(
                    value,
                    previousSymbol,
                    isRemove,
                );
                if (!value) return;
                break;
            default:
                break;
        }
        setPreviousLength(value.length);
        setPreviousSymbol(value.at(-1));
        setValues({
            ...values,
            [key]: value,
        });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        submitCallback();
    };

    return [onChange, onSubmit, values];
};

import { useState } from "react";
import { getStandardFormattedValue } from "./utils/standardFormatting";
import { checkValidLength } from "./utils/lengthFormatting";
import { getIterableFormattedValue } from "./utils/iterableStringFormatting";

export const useForm = (submitCallback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const [previousSymbol, setPreviousSymbol] = useState();
    const [previousLength, setPreviousLength] = useState();
    const onChange = (event) => {
        const key = event.target.name;
        let value = event.target.value;
        const isRemove = previousLength > value.length;
        value = getStandardFormattedValue(value);
        if (!value && value !== "") return;

        switch (key) {
            case "title":
            case "header":
                if (!value && value !== "") return;
                if (checkValidLength(value, 25, isRemove)) return;
                break;
            case "authors":
            case "genres":
                value = getIterableFormattedValue(
                    value,
                    previousSymbol,
                    isRemove,
                );
                if (!value && value !== "") return;
                if (checkValidLength(value, 40, isRemove)) return;
                break;
            case "year":
                value = value.toUpperCase();
                if (/[^IVX0-9ML]/.test(value)) return;
                if (checkValidLength(value, 8, isRemove)) return;
                break;
            case "mainIdea":
            case "description":
                if (!value && value !== "") return;
                break;
            case "image":
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

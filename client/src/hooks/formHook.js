import { useState } from "react";

export const useForm = (submitCallback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        submitCallback();
    };

    return [onChange, onSubmit, values];
};

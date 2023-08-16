import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../../shared/Button/Button";
import { UPDATE_QUOTE } from "../../graphql/mutation";
import { validateForm } from "../../utils/validateForm";
import { GET_BOX_QUOTES } from "../../graphql/queries";
import { isEqualObject } from "../../utils/compareObjects";
import { AuthContext } from "../../context/AuthContext";
import { QuoteForm } from "../../entities/QuoteForm/QuoteForm";
import { useForm } from "../../hooks/formHook";

export const EditQuote = ({ boxId, quoteId, quoteData, closeCallback }) => {
    const { userId, logout } = useContext(AuthContext);

    const editQuote = () => {
        updateQuoteMutation().catch((e) => logout());
        closeCallback();
    };

    const [oldValues, setOldValues] = useState();
    useEffect(() => {
        setOldValues({
            header: quoteData.header,
            marker: quoteData.marker ? quoteData.marker : "",
            isPrivate: quoteData.isPrivate,
            tags: quoteData.tags ? quoteData.tags.join(", ") : "",
            text: quoteData.text,
        });
    }, [quoteData]);

    const privateStore = useState(quoteData.isPrivate);
    const tagsStore = useState(quoteData.tags);

    const [onChange, onSubmit, values] = useForm(editQuote, {
        header: quoteData.header,
        marker: quoteData.marker ? quoteData.marker : "",
        text: quoteData.text,
    });

    const [updateQuoteMutation] = useMutation(UPDATE_QUOTE, {
        variables: {
            quoteId: quoteId,
            newQuote: {
                userId: userId,
                boxId: boxId,
                header: values.header,
                marker: values.marker,
                tags: tagsStore[0],
                text: values.text,
                isPrivate: privateStore[0],
            },
        },
        refetchQueries: [GET_BOX_QUOTES],
    });

    const errors = [];
    const requiredError = !validateForm([values.text]);
    const equalError = isEqualObject(oldValues, {
        header: values.header,
        marker: values.marker,
        tags: tagsStore[0] ? tagsStore[0].join(", ") : "",
        isPrivate: privateStore[0],
        text: values.text,
    });
    if (requiredError) errors.push("Title field is empty");
    if (equalError) errors.push("Nothing to update");

    return (
        <QuoteForm
            header="Edit quote"
            privateStore={privateStore}
            tagsStore={tagsStore}
            values={values}
            onChange={onChange}
            errors={errors}
        >
            <Button onClick={onSubmit} isActive={!requiredError && !equalError}>
                Update quote
            </Button>
        </QuoteForm>
    );
};

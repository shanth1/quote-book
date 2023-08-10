import { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "../../shared/Button/Button";
import { UPDATE_QUOTE } from "../../graphql/mutation";
import { stringToArray } from "../../utils/stringToArray";
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
            tags: quoteData.tags ? quoteData.tags.join(", ") : "",
            isPrivate: quoteData.isPrivate,
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
                tags: stringToArray(values.tags),
                text: values.text,
                isPrivate: privateStore[0],
            },
        },
        refetchQueries: [GET_BOX_QUOTES],
    });

    return (
        <QuoteForm
            header="Edit quote"
            privateStore={privateStore}
            tagsStore={tagsStore}
            values={values}
            onChange={onChange}
        >
            <Button
                onClick={onSubmit}
                isActive={
                    validateForm([values.header, values.text]) &&
                    !isEqualObject(oldValues, {
                        header: values.header,
                        marker: values.marker,
                        tags: tagsStore[0] ? tagsStore[0].join(", ") : "",
                        isPrivate: privateStore[0],
                        text: values.text,
                    })
                }
            >
                Update quote
            </Button>
        </QuoteForm>
    );
};

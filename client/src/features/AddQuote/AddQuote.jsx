import { useContext, useState } from "react";
import Button from "../../shared/Button/Button";
import { useForm } from "../../hooks/formHook";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_QUOTE, INCREMENT_QUOTE_COUNTER } from "../../graphql/mutation";
import { validateForm } from "../../utils/validateForm";
import { GET_BOX_QUOTES, GET_BOX_TAGS } from "../../graphql/queries";
import { AuthContext } from "../../context/AuthContext";
import { QuoteForm } from "../../entities/QuoteForm/QuoteForm";

export const AddQuote = ({ closeCallback, boxId }) => {
    const { userId, logout } = useContext(AuthContext);
    const { data } = useQuery(GET_BOX_TAGS, {
        variables: { boxId: boxId },
    });

    const addQuote = () => {
        incrementQuoteCounter().catch((e) => logout());
        addQuoteMutation().catch((e) => logout());
        closeCallback();
    };
    const privateStore = useState(true);
    const tagsStore = useState(data?.getBox?.tags);

    const [onChange, onSubmit, values] = useForm(addQuote, {
        header: "",
        marker: "",
        text: "",
    });

    const [addQuoteMutation] = useMutation(ADD_QUOTE, {
        variables: {
            quote: {
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
    const [incrementQuoteCounter] = useMutation(INCREMENT_QUOTE_COUNTER, {
        variables: {
            boxId: boxId,
        },
    });

    return (
        <QuoteForm
            header="Add quote"
            privateStore={privateStore}
            tagsStore={tagsStore}
            values={values}
            onChange={onChange}
        >
            <Button onClick={onSubmit} isActive={validateForm([values.text])}>
                Add quote
            </Button>
        </QuoteForm>
    );
};

import { useMutation } from "@apollo/client";
import Content from "../../shared/Content/Content";
import DeleteButton from "../../shared/DeleteButton/DeleteButton";
import H1 from "../../shared/H1/H1";
import Label from "../../shared/Label/Label";
import { DECREMENT_QUOTE_COUNTER, DELETE_QUOTE } from "../../graphql/mutation";
import { GET_BOX_QUOTES, GET_USER_QUOTES } from "../../graphql/queries";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const DeleteQuote = ({ id, boxId, closeCallback }) => {
    const { logout } = useContext(AuthContext);

    const onSubmit = (event) => {
        event.preventDefault();
        decrementQuoteCounter().catch((e) => logout());
        deleteQuote().catch((e) => logout());
        closeCallback();
    };

    const [deleteQuote] = useMutation(DELETE_QUOTE, {
        variables: {
            quoteId: id,
        },
        refetchQueries: [GET_USER_QUOTES, GET_BOX_QUOTES],
    });
    const [decrementQuoteCounter] = useMutation(DECREMENT_QUOTE_COUNTER, {
        variables: {
            boxId: boxId,
        },
    });
    return (
        <form>
            <Content>
                <H1>Are you sure?</H1>
                <Label>Quote can`t be retrieved</Label>
                <div className="w-full">
                    <div className="w-1/2 ml-auto mr-0">
                        <DeleteButton onClick={onSubmit}>
                            Delete quote
                        </DeleteButton>
                    </div>
                </div>
            </Content>
        </form>
    );
};

export { DeleteQuote };

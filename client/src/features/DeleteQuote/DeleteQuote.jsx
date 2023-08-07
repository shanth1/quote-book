import { useMutation } from "@apollo/client";
import Content from "../../shared/Content/Content";
import DeleteButton from "../../shared/DeleteButton/DeleteButton";
import H1 from "../../shared/H1/H1";
import Label from "../../shared/Label/Label";
import { DELETE_QUOTE } from "../../graphql/mutation";
import { GET_BOX_QUOTES, GET_USER_QUOTES } from "../../graphql/queries";

const DeleteQuote = ({ id, closeCallback }) => {
    const onClick = () => {
        deleteQuote();
        closeCallback();
    };

    const [deleteQuote] = useMutation(DELETE_QUOTE, {
        variables: {
            quoteId: id,
        },
        refetchQueries: [GET_USER_QUOTES, GET_BOX_QUOTES],
    });
    return (
        <form>
            <Content>
                <H1>Are you sure?</H1>
                <Label>Quote can`t be retrieved</Label>
                <div className="w-full">
                    <div className="w-1/2 ml-auto mr-0">
                        <DeleteButton onClick={onClick}>
                            Delete quote
                        </DeleteButton>
                    </div>
                </div>
            </Content>
        </form>
    );
};

export { DeleteQuote };

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import { QuoteItem } from "../../widgets/QuoteItem/QuoteItem";
import { Modal } from "../../shared/Modal/Modal";
import { EditQuote } from "../../widgets/EditQuote/EditQuote";
import { DeleteQuote } from "../../widgets/DeleteQuote/DeleteQuote";
import { useQuery } from "@apollo/client";
import { GET_USER_QUOTES } from "../../graphql/queries";

export const Quotes = () => {
    const {
        auth: { user },
    } = useContext(AuthContext);
    const [selectedQuoteData, setSelectedQuoteData] = useState({});
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [updateModalActive, setUpdateModalActive] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [boxId, setBoxId] = useState("");

    const { loading, error, data } = useQuery(GET_USER_QUOTES, {
        variables: { userId: user.id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const quotes = data.getUser.quotes;

    return (
        <div>
            <Content>
                <H1>Box</H1>
                {quotes.length !== 0
                    ? quotes.map((item) => (
                          <QuoteItem
                              quoteData={item}
                              setSelectedId={setSelectedId}
                              setBoxId={setBoxId}
                              setDeleteModalActive={setDeleteModalActive}
                              setUpdateModalActive={setUpdateModalActive}
                              setSelectedQuoteData={setSelectedQuoteData}
                          />
                      ))
                    : "No quotes"}
            </Content>
            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                <DeleteQuote
                    id={selectedId}
                    closeCallback={setDeleteModalActive}
                />
            </Modal>

            <Modal active={updateModalActive} setActive={setUpdateModalActive}>
                {updateModalActive && (
                    <EditQuote
                        userId={user.id}
                        boxId={boxId}
                        quoteId={selectedId}
                        quoteData={selectedQuoteData}
                        closeCallback={setUpdateModalActive}
                    />
                )}
            </Modal>
        </div>
    );
};

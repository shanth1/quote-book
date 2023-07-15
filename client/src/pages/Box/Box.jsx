import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import { QuoteItem } from "../../widgets/QuoteItem/QuoteItem";
import { useQuery } from "@apollo/client";
import { GET_BOX_QUOTES } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import { Modal } from "../../shared/Modal/Modal";
import { DeleteQuote } from "../../widgets/DeleteQuote/DeleteQuote";
import { useContext, useState } from "react";
import { EditQuote } from "../../widgets/EditQuote/EditQuote";
import { AuthContext } from "../../context/AuthContext";

const Box = () => {
    const { boxId } = useParams();
    const {
        auth: { user },
    } = useContext(AuthContext);
    const [selectedQuoteData, setSelectedQuoteData] = useState({});
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [updateModalActive, setUpdateModalActive] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const { loading, error, data } = useQuery(GET_BOX_QUOTES, {
        variables: { boxId: boxId },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const quotes = data.getBox.quotes;

    return (
        <div>
            <Content>
                <H1>Box</H1>
                {quotes.length !== 0
                    ? quotes.map((item) => (
                          <QuoteItem
                              quoteData={item}
                              setSelectedId={setSelectedId}
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

export { Box };

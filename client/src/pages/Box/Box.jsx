import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import { QuoteItem } from "../../widgets/QuoteItem/QuoteItem";
import { useQuery } from "@apollo/client";
import { GET_BOX_QUOTES } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import { Modal } from "../../shared/Modal/Modal";
import { DeleteQuote } from "../../widgets/DeleteQuote/DeleteQuote";
import { useState } from "react";

const Box = () => {
    const { boxId } = useParams();
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [deleteId, setDeleteId] = useState("");

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
                              setDeleteId={setDeleteId}
                              setDeleteModalActive={setDeleteModalActive}
                          />
                      ))
                    : "No quotes"}
            </Content>
            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                <DeleteQuote
                    id={deleteId}
                    closeCallback={setDeleteModalActive}
                />
            </Modal>
        </div>
    );
};

export { Box };

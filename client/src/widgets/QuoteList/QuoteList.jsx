import { useState } from "react";
import { Modal } from "../../shared/Modal/Modal";
import { DeleteQuote } from "../../features/DeleteQuote/DeleteQuote";
import { EditQuote } from "../../features/EditQuote/EditQuote";
import { QuoteItem } from "../../features/QuoteItem/QuoteItem";
import Content from "../../shared/Content/Content";

export const QuoteList = ({ quotes }) => {
    const [selectedQuoteData, setSelectedQuoteData] = useState({});
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const [updateModalActive, setUpdateModalActive] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [boxId, setBoxId] = useState("");
    return (
        <div>
            <Content>
                {quotes.length !== 0
                    ? quotes.map((item) => (
                          <QuoteItem
                              quoteData={item}
                              setSelectedId={setSelectedId}
                              setDeleteModalActive={setDeleteModalActive}
                              setBoxId={setBoxId}
                              setUpdateModalActive={setUpdateModalActive}
                              setSelectedQuoteData={setSelectedQuoteData}
                          />
                      ))
                    : "No quotes"}
            </Content>
            {deleteModalActive && (
                <Modal
                    active={deleteModalActive}
                    setActive={setDeleteModalActive}
                >
                    <DeleteQuote
                        id={selectedId}
                        closeCallback={setDeleteModalActive}
                    />
                </Modal>
            )}
            {updateModalActive && (
                <Modal
                    active={updateModalActive}
                    setActive={setUpdateModalActive}
                >
                    <EditQuote
                        boxId={boxId}
                        quoteId={selectedId}
                        quoteData={selectedQuoteData}
                        closeCallback={setUpdateModalActive}
                    />
                </Modal>
            )}
        </div>
    );
};

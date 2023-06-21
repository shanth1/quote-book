import { useState } from "react";
import { Modal } from "../../shared/Modal/Modal";
import { gql, useQuery } from "@apollo/client";

export const Book = () => {
    const [bookModalActive, setBookModalActive] = useState(true);

    return (
        <div>
            <button onClick={() => setBookModalActive(true)}>Modal</button>
            <h1>alsjdlajsdl</h1>
            <Modal active={bookModalActive} setActive={setBookModalActive} />
        </div>
    );
};

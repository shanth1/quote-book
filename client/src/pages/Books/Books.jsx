import { useState } from "react";
import { Modal } from "../../shared/Modal/Modal";
import { gql, useQuery } from "@apollo/client";

export const Books = () => {
    const [bookModalActive, setBookModalActive] = useState(false);

    return (
        <div>
            <button onClick={() => setBookModalActive(true)}>Modal</button>
            <h1>Книги</h1>
            <Modal active={bookModalActive} setActive={setBookModalActive} />
        </div>
    );
};

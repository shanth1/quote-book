import { useContext, useState } from "react";
import { Modal } from "../../shared/Modal/Modal";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";

const GET_USER = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            username
            books {
                id
                title
            }
        }
    }
`;

export const Books = () => {
    const [bookModalActive, setBookModalActive] = useState(false);
    const {
        auth: { user },
    } = useContext(AuthContext);

    console.log(user);

    const { loading, error, data } = useQuery(GET_USER, {
        variables: { userId: user.id },
    });

    if (loading) return <div>Loading...</div>;

    if (error) alert(error.message);

    console.log(data.getUser.books);

    return (
        <div>
            <button onClick={() => setBookModalActive(true)}>Modal</button>
            <h1>Книги</h1>
            <Modal active={bookModalActive} setActive={setBookModalActive} />
        </div>
    );
};

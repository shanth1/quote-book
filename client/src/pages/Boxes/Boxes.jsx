import { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "./Box/Box";

const GET_USER = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            username
            boxes {
                id
                title
            }
        }
    }
`;

export const Boxes = () => {
    const {
        auth: { user },
    } = useContext(AuthContext);
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { userId: user.id },
    });

    if (loading) return <div>Loading...</div>;

    if (error) alert(error.message);

    const boxes = data.getUser.boxes;

    return (
        <div>
            <h1>Книги</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {boxes.length !== 0
                    ? boxes.map((item) => <Box title={item.title} />)
                    : "No boxes"}
            </div>
        </div>
    );
};

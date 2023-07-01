import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { Box } from "./Box/Box";
import { GET_BOOKS } from "../../graphql/queries";
import H1 from "../../shared/H1/H1";

export const Boxes = () => {
    const {
        auth: { user },
    } = useContext(AuthContext);
    const { loading, error, data } = useQuery(GET_BOOKS, {
        variables: { userId: user.id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const boxes = data.getUser.boxes;

    return (
        <div>
            <H1 text="Boxes" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {boxes.length !== 0
                    ? boxes.map((item) => <Box boxData={item} />)
                    : "No boxes"}
            </div>
        </div>
    );
};

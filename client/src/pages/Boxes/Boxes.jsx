import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/AuthContext";
import { BoxPreview } from "./BoxPreview/BoxPreview";
import { GET_BOXES } from "../../graphql/queries";
import H1 from "../../shared/H1/H1";
import Content from "../../shared/Content/Content";

export const Boxes = () => {
    const {
        auth: { user },
    } = useContext(AuthContext);
    const { loading, error, data } = useQuery(GET_BOXES, {
        variables: { userId: user.id },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const boxes = data.getUser.boxes;

    return (
        <Content>
            <H1>Boxes</H1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {boxes.length !== 0
                    ? boxes.map((item) => <BoxPreview boxData={item} />)
                    : "No boxes"}
            </div>
        </Content>
    );
};

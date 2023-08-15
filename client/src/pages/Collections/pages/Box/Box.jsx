import { useQuery } from "@apollo/client";
import { GET_BOX_QUOTES } from "../../../../graphql/queries";
import { useParams } from "react-router-dom";
import { QuoteList } from "../../../../widgets/QuoteList/QuoteList";
import Content from "../../../../shared/Content/Content";
import H1 from "../../../../shared/H1/H1";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { NotFound } from "../../../NotFound/NotFound";

const Box = () => {
    const { logout } = useContext(AuthContext);

    const { boxId } = useParams();
    const { loading, error, data } = useQuery(GET_BOX_QUOTES, {
        variables: { boxId: boxId },
    });

    if (loading) return <div>Loading...</div>;
    if (error) {
        console.log(error);
        if (error.message === "Auth error") logout();
        if (error.message.includes("Cast to ObjectId failed"))
            return <NotFound />;
        return <div>{error.message}</div>;
    }

    const quotes = data?.getBox?.quotes || [];

    return (
        <Content>
            <H1>{data?.getBox?.title || "Box"}</H1>
            <QuoteList quotes={quotes} />
        </Content>
    );
};

export { Box };

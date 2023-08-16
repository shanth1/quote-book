import { useQuery } from "@apollo/client";
import { BoxList } from "../../../../widgets/BoxList/BoxList";
import Content from "../../../../shared/Content/Content";
import H1 from "../../../../shared/H1/H1";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { GET_USER_BOXES } from "../../../../graphql/queries";
import { Loading } from "../../../../shared/Loading/Loading";

export const Boxes = () => {
    const { userId, logout } = useContext(AuthContext);

    const { loading, error, data } = useQuery(GET_USER_BOXES, {
        variables: { userId },
    });

    if (loading) return <Loading />;
    if (error) {
        if (error.message === "Auth error") logout();
        return <div>{error.message}</div>;
    }

    const boxes = data?.getUser?.boxes || [];

    return (
        <Content>
            <H1>Boxes</H1>
            <BoxList boxes={boxes} />
        </Content>
    );
};

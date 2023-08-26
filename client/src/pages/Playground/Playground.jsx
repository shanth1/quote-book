import { useQuery } from "@apollo/client";
import { GET_PLAYGROUND_BOXES } from "../../graphql/queries";
import Content from "../../shared/Content/Content";
import H1 from "../../shared/H1/H1";
import { Loading } from "../../shared/Loading/Loading";
import { BoxList } from "../../widgets/BoxList/BoxList";

export const Playground = () => {
    const { loading, error, data } = useQuery(GET_PLAYGROUND_BOXES);

    if (loading) return <Loading />;
    if (error) {
        return <div>{error.message}</div>;
    }

    const boxes = data?.getPlaygroundBoxes || [];

    return (
        <Content>
            <H1>Boxes</H1>
            <BoxList boxes={boxes} />
        </Content>
    );
};

import { useQuery } from "@apollo/client";
import { GET_BOXES } from "../../../../graphql/queries";
import { BoxList } from "../../../../widgets/BoxList/BoxList";
import Content from "../../../../shared/Content/Content";
import H1 from "../../../../shared/H1/H1";

export const Boxes = ({ userId }) => {
    const { loading, error, data } = useQuery(GET_BOXES, {
        variables: { userId },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    const boxes = data.getUser.boxes;

    return (
        <Content>
            <H1>Boxes</H1>
            <BoxList boxes={boxes} userId={userId} />
        </Content>
    );
};

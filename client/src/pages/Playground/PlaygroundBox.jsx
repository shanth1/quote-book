import { useQuery } from "@apollo/client";
import { Loading } from "../../shared/Loading/Loading";
import { useParams } from "react-router-dom";
import Content from "../../shared/Content/Content";
import { QuoteList } from "../../widgets/QuoteList/QuoteList";
import H1 from "../../shared/H1/H1";
import { GET_BOX_PLAYGROUND_QUOTES } from "../../graphql/queries";
import { GoBack } from "../../shared/GoBack/GoBack";

export const PlaygroundBox = () => {
    const { boxId } = useParams();
    const { loading, error, data } = useQuery(GET_BOX_PLAYGROUND_QUOTES, {
        variables: { boxId: boxId },
    });

    if (loading) return <Loading />;
    if (error) {
        return <div>{error.message}</div>;
    }

    const quotes = data?.getBoxPlaygroundQuotes || [];

    return (
        <Content>
            <div className="flex gap-2 items-center">
                <GoBack />
                <H1>{data?.getBoxPlaygroundQuotes[0]?.box?.title || "Box"}</H1>
            </div>
            <QuoteList quotes={quotes} />
        </Content>
    );
};

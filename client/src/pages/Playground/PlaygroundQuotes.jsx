import { useQuery } from "@apollo/client";
import { Loading } from "../../shared/Loading/Loading";
import Content from "../../shared/Content/Content";
import { QuoteList } from "../../widgets/QuoteList/QuoteList";
import H1 from "../../shared/H1/H1";
import { GET_ALL_PLAYGROUND_QUOTES } from "../../graphql/queries";
import { GoBack } from "../../shared/GoBack/GoBack";

export const PlaygroundQuotes = () => {
    const { loading, error, data } = useQuery(GET_ALL_PLAYGROUND_QUOTES);

    if (loading) return <Loading />;
    if (error) {
        return <div>{error.message}</div>;
    }

    const quotes = data?.getAllPlaygroundQuotes || [];

    return (
        <Content>
            <div className="flex gap-2 items-center">
                <GoBack />
                <H1>All quotes</H1>
            </div>

            <QuoteList quotes={quotes} />
        </Content>
    );
};

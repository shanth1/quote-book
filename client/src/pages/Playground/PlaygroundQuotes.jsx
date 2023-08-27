import { useQuery } from "@apollo/client";
import { Loading } from "../../shared/Loading/Loading";
import { useNavigate } from "react-router-dom";
import Content from "../../shared/Content/Content";
import { QuoteList } from "../../widgets/QuoteList/QuoteList";
import H1 from "../../shared/H1/H1";
import { GET_ALL_PLAYGROUND_QUOTES } from "../../graphql/queries";

export const PlaygroundQuotes = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_ALL_PLAYGROUND_QUOTES);

    if (loading) return <Loading />;
    if (error) {
        return <div>{error.message}</div>;
    }

    const quotes = data?.getAllPlaygroundQuotes || [];

    return (
        <Content>
            <div className="flex gap-2 items-center">
                <div
                    onClick={() => navigate(-1)}
                    className="transition-all flex justify-center items-center w-10 h-10 bg-white hover:bg-gray-50 hover:scale-105 rounded-full cursor-pointer shadow-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 rtl:rotate-180"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                    </svg>
                </div>
                <H1>All quotes</H1>
            </div>

            <QuoteList quotes={quotes} />
        </Content>
    );
};

import { useQuery } from "@apollo/client";
import { GET_BOX_QUOTES } from "../../../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import { QuoteList } from "../../../../widgets/QuoteList/QuoteList";
import Content from "../../../../shared/Content/Content";
import H1 from "../../../../shared/H1/H1";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { NotFound } from "../../../NotFound/NotFound";

const Box = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

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
            <div className="flex gap-2 items-center">
                <div
                    onClick={() => navigate(-1)}
                    className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer shadow-sm"
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
                <H1>{data?.getBox?.title || "Box"}</H1>
            </div>

            <QuoteList quotes={quotes} />
        </Content>
    );
};

export { Box };

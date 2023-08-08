import { useQuery } from "@apollo/client";
import { GET_USER_QUOTES } from "../../../../graphql/queries";
import { QuoteList } from "../../../../widgets/QuoteList/QuoteList";
import Content from "../../../../shared/Content/Content";
import H1 from "../../../../shared/H1/H1";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export const Quotes = () => {
    const { userId, logout } = useContext(AuthContext);

    const { loading, error, data } = useQuery(GET_USER_QUOTES, {
        variables: { userId: userId },
    });
    if (loading) return <div>Loading...</div>;
    if (error) {
        if (error.message === "Auth error") logout();
        return <div>{error.message}</div>;
    }

    const quotes = data?.getUser?.quotes || [];

    return (
        <Content>
            <H1>All quotes</H1>
            <QuoteList quotes={quotes} />
        </Content>
    );
};

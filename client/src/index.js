import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import {
    ApolloProvider,
    createHttpLink,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const httpLint = createHttpLink({
    uri: `http://${window.location.hostname}/graphql`,
});

const authLink = setContext((_, { header }) => {
    return {
        headers: {
            ...header,
            authorization: localStorage.getItem("token") || "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLint),
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </AuthProvider>
    </React.StrictMode>,
);

reportWebVitals();

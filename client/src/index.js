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

const httpLint = createHttpLink({ uri: "http://localhost:4000/" });

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
    // uri: "http://localhost:4000/graphql",
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

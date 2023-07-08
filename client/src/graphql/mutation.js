import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            user {
                id
                username
            }
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation RegisterUser($user: UserInput) {
        registerUser(user: $user) {
            user {
                id
                email
                username
            }
            token
        }
    }
`;

export const ADD_BOX = gql`
    mutation AddBox($box: BoxInput) {
        addBox(box: $box) {
            id
            title
            authors
            year
            image
            mainIdea
            description
            genres
            tags
            createdAt
            updatedAt
            isPrivate
            rating
            user {
                id
                username
            }
            type
        }
    }
`;

export const DELETE_BOX = gql`
    mutation DeleteBox($boxId: ID!) {
        deleteBox(boxId: $boxId) {
            id
            title
        }
    }
`;

export const ADD_QUOTE = gql`
    mutation Mutation($quote: QuoteInput!) {
        addQuote(quote: $quote) {
            id
            user {
                id
                username
            }
            box {
                id
                title
            }
            header
            page
            timeCode
            tags
            text
            isPrivate
            createdAt
            updatedAt
        }
    }
`;

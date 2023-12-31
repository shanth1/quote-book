import { gql } from "@apollo/client";

export const GET_USER_BOXES = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            id
            username
            boxes {
                id
                title
                type
                mainIdea
                authors
                genres
                rating
                description
                isPrivate
                image
                year
                tags
                createdAt
                updatedAt
                quoteCounter
            }
        }
    }
`;

export const GET_BOX_QUOTES = gql`
    query GetBox($boxId: ID!) {
        getBox(boxId: $boxId) {
            id
            title
            quotes {
                id
                header
                marker
                tags
                text
                isPrivate
                createdAt
                updatedAt
                box {
                    id
                    title
                }
                user {
                    id
                    username
                }
            }
        }
    }
`;

export const GET_USER_QUOTES = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            id
            quotes {
                id
                header
                text
                marker
                tags
                isPrivate
                createdAt
                updatedAt
                box {
                    id
                    title
                }
            }
        }
    }
`;

export const GET_BOX_TAGS = gql`
    query Query($boxId: ID!) {
        getBox(boxId: $boxId) {
            tags
        }
    }
`;

export const GET_USER_TITLES = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            boxes {
                title
            }
        }
    }
`;

export const GET_PLAYGROUND_BOXES = gql`
    query GetPlaygroundBoxes {
        getPlaygroundBoxes {
            id
            title
            type
            isPrivate
            image
            mainIdea
            description
            genres
            tags
            rating
            year
            authors
            createdAt
            quoteCounter
        }
    }
`;

export const GET_BOX_PLAYGROUND_QUOTES = gql`
    query GetPlaygroundQuotes($boxId: ID!) {
        getBoxPlaygroundQuotes(boxId: $boxId) {
            id
            header
            isPrivate
            marker
            tags
            text
            createdAt
            updatedAt
            box {
                id
                title
            }
        }
    }
`;

export const GET_ALL_PLAYGROUND_QUOTES = gql`
    query GetPlaygroundQuotes {
        getAllPlaygroundQuotes {
            id
            header
            isPrivate
            marker
            tags
            text
            createdAt
            updatedAt
            box {
                id
                title
            }
        }
    }
`;

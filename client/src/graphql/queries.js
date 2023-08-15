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

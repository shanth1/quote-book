import { gql } from "@apollo/client";

export const GET_BOXES = gql`
    query GetUser($userId: ID!) {
        getUser(userId: $userId) {
            username
            boxes {
                id
                title
                image
            }
        }
    }
`;

export const GET_BOX_QUOTES = gql`
    query GetBox($boxId: ID!) {
        getBox(boxId: $boxId) {
            quotes {
                id
                header
                page
                timeCode
                tags
                text
                isPrivate
                createdAt
                updatedAt
                user {
                    id
                    username
                }
            }
        }
    }
`;

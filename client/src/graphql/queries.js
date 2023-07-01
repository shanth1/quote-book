import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
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

const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getAllUsers: [User]!
        getUser(userId: ID!): User!
        loginUser(username: String!, password: String!): AuthResponse!
    }

    extend type Mutation {
        registerUser(user: UserInput): AuthResponse!
        deleteUser(userId: ID!): User!
    }

    type AuthResponse {
        user: User!
        token: String!
    }

    input UserInput {
        firstName: String
        lastName: String
        username: String!
        password: String!
    }

    type User {
        id: ID!
        firstName: String
        lastName: String
        username: String!
        password: String!
        createdAt: String!
        updatedAt: String!
        books: [Book]
        quotes: [Quote]
    }
`;

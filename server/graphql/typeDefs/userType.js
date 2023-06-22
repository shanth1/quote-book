const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getAllUsers: [User]!
        getUser(userId: ID!): User!
    }

    extend type Mutation {
        registerUser(user: UserInput): User!
        deleteUser(userId: ID!): User!
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

const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getAllBoxes: [Box]!
        getBox(boxId: ID!): Box
    }

    extend type Mutation {
        addBox(box: BoxInput): Box!
        deleteBox(boxId: ID!): Box!
        updateBox(boxId: ID!, newBox: BoxInput!): Box!
        incrementQuoteCounter(boxId: ID!): Box!
        decrementQuoteCounter(boxId: ID!): Box!
    }

    input BoxInput {
        title: String!
        authors: [String!]!
        year: Int
        image: String
        mainIdea: String
        description: String
        genres: [String]
        tags: [String]
        type: String!
        isPrivate: Boolean!
        rating: Int
        userId: ID!
    }

    type Box {
        id: ID!
        title: String!
        authors: [String!]!
        year: Int
        image: String
        mainIdea: String
        description: String
        genres: [String]
        tags: [String]
        createdAt: String!
        type: String!
        updatedAt: String!
        isPrivate: Boolean!
        rating: Int
        quotes: [Quote]
        user: User
        quoteCounter: Int
    }
`;

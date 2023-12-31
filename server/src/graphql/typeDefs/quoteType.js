const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getAllQuotes: [Quote]
        getQuote(quoteId: ID!): Quote!
        getBoxPlaygroundQuotes(boxId: ID!): [PlaygroundQuote]
        getBoxPlaygroundQuotes(boxId: ID!): [PlaygroundQuote]
        getAllPlaygroundQuotes: [PlaygroundQuote]
    }

    extend type Mutation {
        addQuote(quote: QuoteInput!): Quote!
        deleteQuote(quoteId: ID!): Quote!
        updateQuote(quoteId: ID!, newQuote: QuoteInput!): Quote!
    }

    input QuoteInput {
        header: String
        text: String!
        marker: String
        tags: [String]
        isPrivate: Boolean!
        userId: ID!
        boxId: ID!
    }

    type Quote {
        id: ID!
        header: String
        text: String!
        createdAt: String!
        updatedAt: String!
        marker: String
        tags: [String]
        isPrivate: Boolean!
        user: User!
        box: Box!
    }
    type PlaygroundQuote {
        id: ID!
        header: String
        text: String!
        createdAt: String!
        updatedAt: String!
        marker: String
        tags: [String]
        isPrivate: Boolean!
        boxId: ID!
        box: Box!
    }
`;

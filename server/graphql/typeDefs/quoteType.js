const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getAllQuotes: [Quote]
        getQuote(quoteId: ID!): Quote!
    }

    extend type Mutation {
        addQuote(quote: QuoteInput!): Quote!
        deleteQuote(quoteId: ID!): Quote!
    }

    input QuoteInput {
        header: String
        text: String!
        page: Int
        tags: [String]
        private: Boolean!
        userId: ID!
        bookId: ID!
    }

    type Quote {
        id: ID!
        header: String
        text: String!
        createdAt: String!
        updatedAt: String!
        page: Int
        tags: [String]
        private: Boolean!
        user: User!
        fromBook: Book!
    }
`;

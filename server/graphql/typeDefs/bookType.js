const { gql } = require("apollo-server-express");

module.exports = gql`
    extend type Query {
        getAllBooks: [Book]!
        getBook(bookId: ID!): Book
    }

    extend type Mutation {
        addBook(book: BookInput): Book!
        deleteBook(bookId: ID!): Book!
    }

    input BookInput {
        title: String!
        authors: [String!]!
        year: Int
        pages: Int
        image: String
        file: String
        mainIdea: String
        description: String
        genres: [String]
        tags: [String]
        private: Boolean!
        rating: Int
        userId: ID!
    }

    type Book {
        id: ID!
        title: String!
        authors: [String!]!
        year: Int
        pages: Int
        image: String
        file: String
        mainIdea: String
        description: String
        genres: [String]
        tags: [String]
        createdAt: String!
        updatedAt: String!
        private: Boolean!
        rating: Int
        quotes: [Quote]
        user: User!
    }
`;

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
} = require("graphql");
const User = require("../models/User");
const Book = require("../models/Book");
const Quote = require("../models/Quote");

const DateType = new GraphQLObjectType({
    name: "Date",
    fields: () => ({
        time: { type: GraphQLInt },
        year: { type: GraphQLInt },
        month: { type: GraphQLInt },
        day: { type: GraphQLInt },
        hour: { type: GraphQLInt },
        minute: { type: GraphQLInt },
        second: { type: GraphQLInt },
    }),
});

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        registrationDate: {
            type: new GraphQLNonNull(DateType),
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ userId: parent.id });
            },
        },
        quotes: {
            type: new GraphQLList(QuoteType),
            resolve(parent, args) {
                return Quote.find({ userId: parent.id });
            },
        },
    }),
});

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        authors: { type: new GraphQLList(GraphQLNonNull(GraphQLString)) },
        year: { type: GraphQLInt },
        pages: { type: GraphQLInt },
        image: { type: GraphQLString },
        file: { type: GraphQLString },
        mainIdea: { type: GraphQLString },
        description: { type: GraphQLString },
        genres: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        creationDate: {
            type: new GraphQLNonNull(DateType),
        },
        private: { type: GraphQLBoolean },
        rating: { type: GraphQLInt },
        quotes: {
            type: new GraphQLList(QuoteType),
            resolve(parent, args) {
                return Quote.find({ bookId: parent.id });
            },
        },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            },
        },
    }),
});

const QuoteType = new GraphQLObjectType({
    name: "Quote",
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        header: { type: GraphQLString },
        text: { type: GraphQLNonNull(GraphQLString) },
        creationDate: {
            type: new GraphQLNonNull(DateType),
        },
        page: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
        private: { type: GraphQLBoolean },
        rating: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId);
            },
        },
        book: {
            type: BookType,
            resolve(parent, args) {
                return Book.findById(parent.bookId);
            },
        },
    }),
});

module.exports = { UserType, BookType, QuoteType };

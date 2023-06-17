const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require("graphql");
const Book = require("../../models/Book");
const BookType = require("../types/bookType");

const getAllBooks = {
    type: new GraphQLList(BookType),
    resolve(parent, args) {
        return Book.find();
    },
};

const getBook = {
    type: BookType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        return Book.findById(args.id);
    },
};

module.exports = { getAllBooks, getBook };

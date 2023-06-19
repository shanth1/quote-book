const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const { BookType } = require("../types");
const Book = require("../../models/Book");

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

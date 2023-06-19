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
const User = require("../../models/User");
const { UserType, BookType } = require("../types");

const addBook = {
    type: BookType,
    args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        authors: { type: new GraphQLList(GraphQLNonNull(GraphQLString)) },
        mainIdea: { type: GraphQLString },
        description: { type: GraphQLString },
        pages: { type: GraphQLInt },
        rating: {
            type: new GraphQLEnumType({
                name: "BookRating",
                values: {
                    one: { value: 1 },
                    two: { value: 2 },
                    three: { value: 3 },
                    four: { value: 4 },
                    five: { value: 5 },
                },
            }),
        },
        userId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        const book = new Book({
            title: args.title,
            authors: args.authors,
            mainIdea: args.mainIdea,
            description: args.description,
            pages: args.pages,
            rating: args.rating,
            userId: args.userId,
        });

        console.log(User.findById(args.userId));

        return book.save();
    },
};

const deleteBook = {
    type: BookType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        return Book.findByIdAndRemove(args.id);
    },
};

module.exports = { addBook, deleteBook };

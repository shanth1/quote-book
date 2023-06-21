const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLBoolean,
} = require("graphql");
const Book = require("../../models/Book");
const User = require("../../models/User");
const { BookType, DateInputType } = require("../types");

const addBook = {
    type: BookType,
    args: {
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
            type: new GraphQLNonNull(DateInputType),
        },
        private: { type: new GraphQLNonNull(GraphQLBoolean) },
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
            year: args.year,
            pages: args.pages,
            image: args.image,
            file: args.file,
            mainIdea: args.mainIdea,
            description: args.description,
            genres: args.genres,
            tags: args.tags,
            creationDate: args.creationDate,
            private: args.private,
            rating: args.rating,
            userId: args.userId,
        });

        return book.save();
    },
};

const deleteBook = {
    type: BookType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        Quote.find({ userId: args.id }).then((quotes) => {
            quotes.forEach((quote) => {
                quote.deleteOne();
            });
        });

        return Book.findByIdAndRemove(args.id);
    },
};

module.exports = { addBook, deleteBook };

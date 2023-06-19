const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} = require("graphql");
const User = require("../../models/User");
const { DateInputType, QuoteType } = require("../types");
const Quote = require("../../models/Quote");

const addQuote = {
    type: QuoteType,
    args: {
        header: { type: GraphQLString },
        text: { type: GraphQLNonNull(GraphQLString) },
        creationDate: {
            type: new GraphQLNonNull(DateInputType),
        },
        page: { type: GraphQLInt },
        tags: { type: new GraphQLList(GraphQLString) },
        private: { type: new GraphQLNonNull(GraphQLBoolean) },
        rating: { type: GraphQLInt },
        userId: { type: GraphQLNonNull(GraphQLID) },
        bookId: { type: GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
        const quote = new Quote({
            header: args.header,
            text: args.text,
            creationDate: args.creationDate,
            page: args.page,
            tags: args.tags,
            private: args.private,
            rating: args.rating,
            userId: args.userId,
            bookId: args.bookId,
        });

        return quote.save();
    },
};

const deleteQuote = {
    type: QuoteType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        return User.findByIdAndRemove(args.id);
    },
};

module.exports = { addQuote, deleteQuote };

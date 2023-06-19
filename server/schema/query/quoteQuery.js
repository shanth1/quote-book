const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const { QuoteType } = require("../types");
const Quote = require("../../models/Quote");

const getAllQuotes = {
    type: new GraphQLList(QuoteType),
    resolve(parent, args) {
        return Quote.find();
    },
};

const getQuote = {
    type: QuoteType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        return Quote.findById(args.id);
    },
};

module.exports = { getAllQuotes, getQuote };

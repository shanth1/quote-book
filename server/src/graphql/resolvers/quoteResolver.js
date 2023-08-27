const playgroundQuotes = require("./data/playgroundQuotes");

module.exports = {
    Query: {
        getAllQuotes: async (_, __, { Quote }) => {
            return await Quote.find();
        },
        getQuote: async (_, { quoteId }, { Quote }) => {
            return await Quote.findById(quoteId);
        },
        getBoxPlaygroundQuotes: async (_, { boxId }) => {
            return playgroundQuotes[Number(boxId) - 1];
        },
        getAllPlaygroundQuotes: async () => {
            return [...playgroundQuotes[0], ...playgroundQuotes[1]];
        },
    },
    Quote: {
        user: async ({ userId }, _, { User }) => {
            return User.findById(userId);
        },
        box: async ({ boxId }, _, { Box }) => {
            return Box.findById(boxId);
        },
    },
    Mutation: {
        addQuote: async (_, { quote }, { Quote, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }
            const newQuote = await new Quote(quote);
            return newQuote.save();
        },

        deleteQuote: async (_, { quoteId }, { Quote, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }

            return Quote.findByIdAndRemove(quoteId);
        },

        updateQuote: async (_, { quoteId, newQuote }, { Quote, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }
            const updatedQUote = await Quote.findByIdAndUpdate(
                quoteId,
                newQuote,
                { new: true },
            );
            return updatedQUote;
        },
    },
};

module.exports = {
    Query: {
        getAllQuotes: async (_, __, { Quote }) => {
            return await Quote.find();
        },
        getQuote: async (_, { quoteId }, { Quote }) => {
            return await Quote.findById(quoteId);
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
        addQuote: async (_, { quote }, { Quote }) => {
            const newQuote = await new Quote(quote);
            return newQuote.save();
        },

        deleteQuote: async (_, { quoteId }, { Quote }) => {
            return Quote.findByIdAndRemove(quoteId);
        },

        updateQuote: async (_, { quoteId, newQuote }, { Quote }) => {
            const updatedQUote = await Quote.findByIdAndUpdate(
                quoteId,
                newQuote,
                { new: true },
            );
            return updatedQUote;
        },
    },
};
module.exports = {
    Query: {
        getAllQuotes: async (_, {}, { Quote }) => {
            return await Quote.find();
        },
        getQuote: async (_, { quoteArgs }, { Quote }) => {
            const { quoteId } = quoteArgs;
            return await Quote.find(quoteId);
        },
    },
    Mutation: {
        addQuote: async (_, { quoteArgs }, { Quote }) => {
            const { header, text, page, tags, private, userId, bookId } =
                quoteArgs;
            const newQuote = new Quote({
                header,
                text,
                page,
                tags,
                private,
                userId,
                bookId,
            });

            return newQuote.save();
        },

        deleteQuote: async (_, { quoteArgs }, { Quote }) => {
            const { quoteId } = quoteArgs;
            return Quote.findByIdAndRemove(quoteId);
        },
    },
};

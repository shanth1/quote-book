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
        book: async ({ bookId }, _, { Book }) => {
            return Book.findById(bookId);
        },
    },
    Mutation: {
        addQuote: async (_, { quote }, { Quote }) => {
            const { header, text, page, tags, private, userId, bookId } = quote;
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

        deleteQuote: async (_, { quoteId }, { Quote }) => {
            return Quote.findByIdAndRemove(quoteId);
        },
    },
};
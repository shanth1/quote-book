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
        addQuote: async (_, { quote }, { Quote, Box, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }

            const boxId = quote.boxId;
            const parentBox = await Box.findById(boxId);
            await Box.findByIdAndUpdate(
                boxId,
                { quoteCounter: (parentBox.quoteCounter += 1) },
                { new: true },
            );

            const newQuote = await new Quote(quote);
            return newQuote.save();
        },

        deleteQuote: async (_, { quoteId }, { Box, Quote, isAuth }) => {
            if (!isAuth) {
                throw new ApolloError("Auth error");
            }

            const quote = await Quote.findById(quoteId);
            const boxId = quote.boxId;
            const parentBox = await Box.findById(boxId);
            await Box.findByIdAndUpdate(
                boxId,
                { quoteCounter: (parentBox.quoteCounter -= 1) },
                { new: true },
            );
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

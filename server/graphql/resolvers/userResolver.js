module.exports = {
    Query: {
        getAllUsers: async (parent, {}, { User }) => {
            let users = await User.find();
            return users;
        },
        getUser: async (_, { userId }, { User }) => {
            return await User.findById(userId);
        },
    },

    User: {
        books: async (parent, _, { Book }) => {
            return await Book.find({ userId: parent.id });
        },
        quotes: async (parent, _, { Quote }) => {
            return await Quote.find({ userId: parent.id });
        },
    },
    Mutation: {
        registerUser: async (_, { user }, { User }) => {
            const { firstName, lastName, username, password } = user;
            const newUser = new User({
                firstName,
                lastName,
                username,
                password,
            });

            return newUser.save();
        },

        deleteUser: async (_, { userId }, { User, Book, Quote }) => {
            try {
                Book.find({ userId }).then((books) => {
                    books.forEach((book) => {
                        book.deleteOne();
                    });
                });

                Quote.find({ userId }).then((quotes) => {
                    quotes.forEach((quote) => {
                        quote.deleteOne();
                    });
                });
                return User.findByIdAndRemove(userId);
            } catch (err) {
                throw new ApolloError(err.message);
            }
        },
    },
};

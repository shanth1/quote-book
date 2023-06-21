module.exports = {
    Query: {
        getAllUsers: async (_, {}, { User }) => {
            let users = await User.find();
            return users;
        },
        getUser: async (_, { userArgs }, { User }) => {
            const { userId } = userArgs;
            return await User.find(userId);
        },
    },
    Mutation: {
        registerUser: async (_, { userArgs }, { User }) => {
            const { firstName, lastName, username, password } = userArgs;
            const newUser = new User({
                firstName,
                lastName,
                username,
                password,
            });

            return newUser.save();
        },

        deleteUser: async (_, { userArgs }, { User }) => {
            const { userId } = userArgs;
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
        },
    },
};

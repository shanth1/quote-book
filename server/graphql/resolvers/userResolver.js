const { ApolloError } = require("apollo-server-express");

const { hash } = require("bcryptjs");
const createToken = require("../../functions/issueToken");

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
        registerUser: async (_, args, { User }) => {
            try {
                const { firstName, lastName, username, password } = args.user;

                const newUser = await User.findOne({ username });

                if (newUser) {
                    throw new Error("Username is already taken ");
                }

                const hashedPassword = await hash(password, 7);

                const user = new User({
                    firstName,
                    lastName,
                    username,
                    password: hashedPassword,
                });

                user.save();
                const token = createToken(user.username);

                return { user, token };
            } catch (error) {
                throw new ApolloError(error.message, 400);
            }
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

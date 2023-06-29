const { ApolloError } = require("apollo-server-express");

const { hash, compare } = require("bcryptjs");
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
        boxes: async (parent, _, { Box }) => {
            return await Box.find({ userId: parent.id });
        },
        quotes: async (parent, _, { Quote }) => {
            return await Quote.find({ userId: parent.id });
        },
    },
    Mutation: {
        loginUser: async (_, { username, password }, { User }) => {
            try {
                const user = await User.findOne({ username });
                if (!user) {
                    throw new ApolloError("User not found");
                }
                const isPasswordCorrect = await compare(
                    password,
                    user.password,
                );
                if (!isPasswordCorrect) {
                    throw new ApolloError("Invalid password");
                }
                const token = createToken({
                    id: user.id,
                    username: user.username,
                });
                return { user, token };
            } catch (error) {
                throw new ApolloError(error.message, 403);
            }
        },
        registerUser: async (_, args, { User }) => {
            try {
                console.log("REGISTER");
                const { firstName, lastName, email, username, password } =
                    args.user;

                const newUser = await User.findOne({ username });

                if (newUser) {
                    throw new Error("Username is already taken ");
                }

                const hashedPassword = await hash(password, 7);

                const user = new User({
                    firstName,
                    lastName,
                    email,
                    username,
                    password: hashedPassword,
                });

                user.save();
                const token = createToken({
                    id: user.id,
                    username: user.username,
                });

                return { user, token };
            } catch (error) {
                throw new ApolloError(error.message, 400);
            }
        },

        deleteUser: async (_, { userId }, { User, Box, Quote }) => {
            try {
                Box.find({ userId }).then((boxes) => {
                    boxes.forEach((box) => {
                        box.deleteOne();
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

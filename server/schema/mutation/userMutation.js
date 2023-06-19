const { GraphQLID, GraphQLString, GraphQLNonNull } = require("graphql");
const User = require("../../models/User");
const { UserType, DateInputType } = require("../types");
const Book = require("../../models/Book");
const Quote = require("../../models/Quote");

const addUser = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        registrationDate: {
            type: new GraphQLNonNull(DateInputType),
        },
    },
    resolve(parent, args) {
        const user = new User({
            name: args.name,
            username: args.username,
        });

        return user.save();
    },
};

const deleteUser = {
    type: UserType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        Book.find({ userId: args.id }).then((books) => {
            books.forEach((book) => {
                book.deleteOne();
            });
        });

        Quote.find({ userId: args.id }).then((quotes) => {
            quotes.forEach((quote) => {
                quote.deleteOne();
            });
        });

        return User.findByIdAndRemove(args.id);
    },
};

module.exports = { addUser, deleteUser };

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require("graphql");
const User = require("../../models/User");
const UserType = require("../types/userType");
const Book = require("../../models/Book");

const addUser = {
    type: UserType,
    args: {
        name: { type: GraphQLString },
        login: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
        const user = new User({
            name: args.name,
            login: args.login,
            password: args.password,
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

        return User.findByIdAndRemove(args.id);
    },
};

module.exports = { addUser, deleteUser };

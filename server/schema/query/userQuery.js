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
const Book = require("../../models/Book");
const { UserType, BookType } = require("../types");

const getAllUsers = {
    type: new GraphQLList(UserType),
    resolve(parent, args) {
        return User.find();
    },
};

const getUser = {
    type: UserType,
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        return User.findById(args.id);
    },
};

const getUserBooks = {
    type: new GraphQLList(BookType),
    args: { id: { type: GraphQLNonNull(GraphQLID) } },
    resolve(parent, args) {
        return Book.find({ userId: args.id });
    },
};

module.exports = { getAllUsers, getUser, getUserBooks };

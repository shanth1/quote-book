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
const UserType = require("../types/userType");
const User = require("../../models/User");

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

module.exports = { getAllUsers, getUser };

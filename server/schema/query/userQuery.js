const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const { UserType } = require("../types");
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

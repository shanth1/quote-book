const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { getAllBooks, getBook } = require("./query/bookQuery");
const { getAllUsers, getUser, getUserBooks } = require("./query/userQuery");
const { addUser, deleteUser } = require("./mutation/userMutation");
const { addBook, deleteBook } = require("./mutation/bookMutation");

const query = new GraphQLObjectType({
    name: "Query",
    fields: {
        getAllBooks,
        getBook,
        getAllUsers,
        getUser,
        getUserBooks,
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser,
        deleteUser,
        addBook,
        deleteBook,
    },
});

module.exports = new GraphQLSchema({
    query,
    mutation,
});

const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { getAllBooks, getBook } = require("./query/bookQuery");
const { getAllUsers, getUser, getUserBooks } = require("./query/userQuery");
const { addUser, deleteUser } = require("./mutation/userMutation");
const { addBook, deleteBook } = require("./mutation/bookMutation");
const { getAllQuotes, getQuote } = require("./query/quoteQuery");
const { addQuote, deleteQuote } = require("./mutation/quoteMutation");

const query = new GraphQLObjectType({
    name: "Query",
    fields: {
        getAllUsers,
        getUser,
        getAllBooks,
        getBook,
        getAllQuotes,
        getQuote,
    },
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser,
        deleteUser,
        addBook,
        deleteBook,
        addQuote,
        deleteQuote,
    },
});

module.exports = new GraphQLSchema({
    query,
    mutation,
});

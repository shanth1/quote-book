require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const express = require("express");
const connectDB = require("./config/db.js");
const AppModel = require("./models/AppModel.js");

const userResolver = require("./graphql/resolvers/userResolver.js");
const bookResolver = require("./graphql/resolvers/bookResolver.js");
const quoteResolver = require("./graphql/resolvers/quoteResolver.js");

const baseDefs = require("./graphql/typeDefs/baseDef.js");
const userType = require("./graphql/typeDefs/userType.js");
const bookType = require("./graphql/typeDefs/bookType.js");
const quoteType = require("./graphql/typeDefs/quoteType.js");

const typeDefs = [baseDefs, userType, bookType, quoteType];
const resolvers = [userResolver, bookResolver, quoteResolver];

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: process.env.NODE_ENV === "development",
    context: { ...AppModel },
});

const startApp = async () => {
    try {
        connectDB();
        await server.start();
        server.applyMiddleware({ app: app });
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startApp();

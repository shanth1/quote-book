require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");

const express = require("express");
const connectDB = require("./config/db.js");
const AppModel = require("./models/AppModel.js");

const userResolver = require("./graphql/resolvers/userResolver.js");
const boxResolver = require("./graphql/resolvers/boxResolver.js");
const quoteResolver = require("./graphql/resolvers/quoteResolver.js");

const baseDefs = require("./graphql/typeDefs/baseDef.js");
const userType = require("./graphql/typeDefs/userType.js");
const boxType = require("./graphql/typeDefs/boxType.js");
const quoteType = require("./graphql/typeDefs/quoteType.js");
const AuthMiddleware = require("./middleware/auth.js");

const cors = require("cors");

const typeDefs = [baseDefs, userType, boxType, quoteType];
const resolvers = [userResolver, boxResolver, quoteResolver];

const PORT = process.env.PORT || 4040;

const app = express();
app.use(cors());
app.use(AuthMiddleware);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: process.env.NODE_ENV === "development",
    context: ({ req }) => {
        let { user, isAuth } = req;
        return {
            user,
            isAuth,
            ...AppModel,
        };
    },
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

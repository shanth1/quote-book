require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db.js");

const PORT = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === "development",
    }),
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

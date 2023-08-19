const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoURI =
        process.env.MONGO_URI || "mongodb://localhost:27017/quotes";
    const connect = await mongoose.connect(mongoURI);

    console.log("Mongo DB connected", connect.connection.host);
};

module.exports = connectDB;

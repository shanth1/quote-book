const mongoose = require("mongoose");

const connectDB = async () => {
    const mongoURI =
        process.env.MONGO_URI || "mongodb://localhost:27017/quotes";
    try {
        const connect = await mongoose.connect(mongoURI);
        console.log("Mongo DB connected", connect.connection.host);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;

const mongoose = require("mongoose");
const dateType = require("./date");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    registrationDate: dateType,
    books: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Book",
    },
    quotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Quote",
    },
});

module.exports = mongoose.model("User", UserSchema);

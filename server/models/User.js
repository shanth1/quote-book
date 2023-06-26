const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, unique: true, required: true },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        books: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Book",
        },
        quotes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Quote",
        },
        // tags: { type: [String] },
        // genres: { type: [String] },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);

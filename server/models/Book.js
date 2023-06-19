const mongoose = require("mongoose");
const dateType = require("./date");

const BookSchema = new mongoose.Schema({
    title: { type: String },
    authors: { type: [String] },
    year: { type: Number },
    pages: { type: Number },
    image: { type: String },
    file: { type: String },
    mainIdea: { type: String },
    description: { type: String },
    genres: { type: [String] },
    tags: { type: [String] },
    creationDate: dateType,
    private: Boolean,
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    quotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Quote",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Book", BookSchema);

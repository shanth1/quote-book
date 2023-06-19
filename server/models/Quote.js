const mongoose = require("mongoose");
const dateType = require("./date");

const QuoteSchema = new mongoose.Schema({
    header: { type: String },
    text: { type: String },
    creationDate: dateType,
    page: { type: Number },
    tags: { type: [String] },
    private: Boolean,
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
});

module.exports = mongoose.model("Quote", QuoteSchema);

const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
    {
        header: { type: String },
        text: { type: String },
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
    },
    { timestamps: true },
);

module.exports = mongoose.model("Quote", QuoteSchema);

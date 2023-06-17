const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: { type: String },
    authors: { type: [String] },
    mainIdea: { type: String },
    description: { type: String },
    pages: { type: Number },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Book", BookSchema);

const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema(
    {
        header: { type: String },
        text: { type: String },
        marker: { type: String },
        tags: { type: [String] },
        isPrivate: { type: Boolean, default: true },
        rating: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        boxId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Box",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Quote", QuoteSchema);

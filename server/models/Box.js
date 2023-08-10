const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema(
    {
        title: { type: String },
        authors: { type: [String] },
        year: { type: String },
        image: {
            type: String,
            default:
                "https://www.vinterier.ru/pictures/shop/rodnoiy-peiyzag-kartina-maslom-90x60.jpg",
        },
        mainIdea: { type: String },
        description: { type: String },
        type: {
            type: String,
            enum: ["Book", "Movie", "Music", "Person", "Other"],
        },
        genres: { type: [String] },
        tags: { type: [String] },
        isPrivate: { type: Boolean, default: true },
        rating: {
            type: Number,
        },
        quotes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Quote",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        quoteCounter: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Box", BoxSchema);

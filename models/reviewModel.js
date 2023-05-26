const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            require: true,
        },
        rating: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("reviews", reviewSchema);
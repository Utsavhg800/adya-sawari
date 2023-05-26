const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    token: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);
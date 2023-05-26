const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bus: {
            type: mongoose.Schema.ObjectId,
            ref: "bus",
            require: true,
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            require: true,
        },
        seats: {
            type: Array,
            require: true,
        },
        transactionId: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending"
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "paid"],
        },
        pdfTicket: {
            type: String,
        }

    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("bookings", bookingSchema);
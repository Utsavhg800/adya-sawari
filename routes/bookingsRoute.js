const router = require("express").Router();
const Booking = require("../models/bookingsModel")
const Bus = require("../models/busModel")
const authMiddleware = require("../middlewares/authMiddleware");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const User = require("../models/usersModel");
const doc = new PDFDocument();

//For Booking the seat

router.get("/bookings-list", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('bus')
            .populate('userId');

        res.status(200).send({
            message: "Bookings",
            data: bookings,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Bookings are failed",
            data: error,
            success: false,
        });
    }
});

router.post("/bookings", authMiddleware, async (req, res) => {
    let userId = req.body.userId;

    try {
        const bookings = await Booking.find({userId: userId}).populate('bus');
        bookings.map(booking => {
            booking.pdfTicket = `http://localhost:5000/${booking.pdfTicket}`;
            return booking;
        });
        res.status(200).send({
            message: "Bookings",
            data: bookings,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Bookings are failed",
            data: error,
            success: false,
        });
    }
});


router.post("/book-seat", authMiddleware, async (req, res) => {
    try {
        const newBooking = new Booking({
            ...req.body,
            transactionId: '1234',
            user: req.body.userId
        });

        await newBooking.save();
        const bus = await Bus.findById(req.body.bus);
        bus.bookedSeats = [...bus.bookedSeats, ...req.body.seats];
        await bus.save();
        let findUser = await User.findById(req.body.userId);
        let billName = `bill-${newBooking._id}.pdf`;
        const writeStream = fs.createWriteStream(`./public/${billName}`);
        doc.pipe(writeStream);
        doc.fontSize(16)
            .text('Bill Details', {underline: true, align: 'center'})
            .moveDown();
        doc.fontSize(12)
            .text(`Customer Name: ${findUser.name}`, {indent: 20})
            .text(`Email: ${findUser.email}`, {indent: 20})
            .text(`Invoice Number: #${newBooking._id}`, {indent: 20})
            .text(`Invoice Date: ${newBooking.createdAt}`, {indent: 20})
            .text(`From: ${bus.from}`, {indent: 20})
            .text(`To: ${bus.to}`, {indent: 20})
            .text(`Seat number : ${req.body.seats}`, {indent: 20})
            .moveDown();
        doc.fontSize(14)
            .text('Items:', {underline: true, indent: 20})
            .moveDown();
        doc.fontSize(12);
        let totalAmount = 0;
        let totalSeats = req.body.seats.length;
        for (let i = 0; i < totalSeats; i++) {
            totalAmount += bus.price;
        }
        newBooking.pdfTicket = billName;
        await newBooking.save();
        doc.moveDown();
        doc.fontSize(14)
            .text(`Total Amount: Rs. ${totalAmount}`, {indent: 20})
            .moveDown();

        doc.end();
        writeStream.on('finish', () => {
            console.log('Bill PDF generated successfully!');
            // after restart server pdf file will be deleted
        });
        res.status(200).send({
            message: "Booking has been successfully done",
            data: newBooking,
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: "Booking is failed",
            data: error,
            success: false,
        });
    }

});

module.exports = router;
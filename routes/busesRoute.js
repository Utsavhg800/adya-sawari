const router = require("express").Router();
const Bus = require("../models/busModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Adding the Buses
router.post("/add-bus", authMiddleware, async (req, res) => {
    try {
        const existedBus = await Bus.findOne({number: req.body.number});
        if (existedBus) {
            return res.status(200).send({
                success: false,
                message: "Bus with this number already exists",
            });
        }
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({
            success: true,
            message: 'Bus is added successfully',
        });
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
});


// update-bus

router.post("/update-bus", authMiddleware, async (req, res) => {
    try {
        await Bus.findByIdAndUpdate(req.body._id, req.body);
        return res.status(200).send({
            success: true,
            message: "Bus updated successfully",
        });
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
});


// delete-bus

router.post("/delete-bus", authMiddleware, async (req, res) => {
    try {
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success: true,
            message: "Bus deleted successfully",
        });
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
});


// Display Buses

router.post("/display-buses", authMiddleware, async (req, res) => {
    try {
        let body = req.body;

        if (!body.from && !body.to && !body.journeyDate) {
            const buses = await Bus.find();
            return res.status(200).send({
                success: true,
                message: "Buses fetched successfully",
                data: buses,
            });
        } else {
            const buses = await Bus.find({
                from: body.from,
                to: body.to,
                journeyDate: body.journeyDate,
            });
            return res.status(200).send({
                success: true,
                message: "Buses fetched successfully",
                data: buses,
            });
        }

    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
});

// Get Bus by id
router.post("/get-bus-by-id", authMiddleware, async (req, res) => {
    try {
        const bus = await Bus.findById(req.body._id);
        return res.status(200).send({
            success: true,
            message: "Bus fetched successfully",
            data: bus,
        });
    } catch (error) {
        res.status(500).send({success: false, message: error.message});
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/getallbookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room');
        res.send(bookings);
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SK);

router.get('/getallbookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('room');
        res.send(bookings);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/bookroom', async (req, res) => {
    // console.log('here', req.body);
    const { token } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const payment = await stripe.charges.create(
            {
                amount: req.body.totalAmount * 100,
                currency: 'USD',
                customer: customer.id,
                receipt_email: token.email,
            },
            {
                idempotencyKey: uuidv4(),
            }
        );

        if (payment) {
            req.body.transactionId = payment.source.id;
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const room = await Room.findOne({ _id: req.body.room });
            console.log(req.body.room);
            room.bookedTimeSlots.push(req.body.bookedTimeSlots);

            await room.save();
            res.send('Your booking is successfull');
        } else {
            return res.status(400).json(error);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

module.exports = router;

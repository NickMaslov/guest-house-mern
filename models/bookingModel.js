const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        room: { type: mongoose.Schema.Types.ObjectID, ref: 'rooms' },
        user: { type: mongoose.Schema.Types.ObjectID, ref: 'users' },
        bookedTimeSlots: {
            from: { type: String },
            to: { type: String },
        },
        totalDays: { type: Number },
        totalAmount: { type: Number },
        transactionId: { type: String },
    },
    { timestamps: true }
);

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;

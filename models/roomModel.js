const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        amenities: [{ type: String }],
        bookedTimeSlots: [
            {
                from: { type: String, required: true },
                to: { type: String, required: true },
            },
        ],

        rentPerDay: { type: Number, required: true },
    },
    { timestamps: true }
);
const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel;

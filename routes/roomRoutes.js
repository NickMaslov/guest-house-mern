const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

router.get('/getallrooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.send(rooms);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/addroom', async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.send('Room added successfully');
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;

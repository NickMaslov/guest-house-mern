const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

router.get('/getallrooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        console.log(rooms);
        res.send(rooms);
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;

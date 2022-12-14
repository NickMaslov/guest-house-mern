require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db');

dbConnection();
app.use(express.json());

app.use('/api/rooms/', require('./routes/roomRoutes'));
app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/bookings/', require('./routes/bookingRoutes'));

const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    });
}

app.listen(port, () => console.log(`Node JS Server Started on port ${port}`));

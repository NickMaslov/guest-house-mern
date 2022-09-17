const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require('./db');

dbConnection();
app.use(express.json());

app.use('/api/rooms/', require('./routes/roomRoutes'));
app.use('/api/users/', require('./routes/userRoutes'));
app.use('/api/bookings/', require('./routes/bookingsRoute'));

app.get('/', (req, res) => res.send('Hello world!'));

app.listen(port, () => console.log(`Node JS Server Started on port ${port}`));

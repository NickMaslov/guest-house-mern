const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const dbConnection = require('./db');

app.get('/', (req, res) => res.send('Hello world!'));
app.listen(port, () => console.log(`Node JS Server Started on port ${port}`));

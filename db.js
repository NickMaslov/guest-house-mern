const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(
        'mongodb+srv://admin:admin12345@cluster0.icqu1dj.mongodb.net/guest-house',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
    );
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('MongoDB connection successful!');
    });

    connection.on('error', () => {
        console.log('MongoDB connection Failed!');
    });
}

module.exports = connectDB;

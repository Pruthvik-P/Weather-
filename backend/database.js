const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://Pruthvik6666:dU2y5ZpNqyw1nFdU@cluster0.f4s0w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

module.exports = connectDB;


//dU2y5ZpNqyw1nFdU
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    
    userId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    seatNo: {
        type: Array,
        required: true
    },

});

const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;

const mongoose = require('mongoose');


const bookingSkema = new mongoose.Schema({
    bus: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bus',
        required: [true, 'Cart must belong to a user.']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Cart must belong to a user.']
    },
    bookingDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

})

bookingSkema.pre(/^find/, function(next) {

    this.populate({
        path: 'bus',
        select: 'name destination'
    })

    next();
})


const Booking = mongoose.model('Booking', bookingSkema);

module.exports = Booking;
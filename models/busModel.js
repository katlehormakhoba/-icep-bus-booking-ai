const mongoose = require('mongoose');


const busSkema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide Buss name'],

    },
    destination : {
        type: String,
        enum: ['Main campus','Arcadia campus'],
        default: 'Arcadia campus'
    },
    seats: {
        type: Number,
        default : 10

    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

// cartSkema.pre(/^find/, function(next) {

//     this.populate({
//         path: 'product',
//         select: 'name category price color coverImage'
//     })

//     next();
// })


const Bus = mongoose.model('Bus', busSkema);

module.exports = Bus;
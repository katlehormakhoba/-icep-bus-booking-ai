const mongoose = require('mongoose');
const validator = require('validator');


const busSkema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide Bus name'],

    },
    from : {
        type: String,
        enum: ['Main campus','Arcadia campus'],
        default: 'Arcadia campus',
        required: [true, 'Please provide Start location']

    },
    to : {
        type: String,
        required: [true, 'Please provide Destination'],
        enum: ['Main campus','Arcadia campus'],
        validate: {
            validator: function(el){
                console.log(el, this.from)
                return el !== this.from
            },
            message: 'From and To cant have the same values'
        }
    },
    seats: {
        type: Number,
        enum: [10],
        default : 10

    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        default: Date()
    },
    expDate : {
        type: String,
        default: new Date(Date.now() + 5* 60000).toString()
    }
})

// busSkema.pre(/^find/, function(next) {

//     console.log(this.expDate)
//     next();
// })



const Bus = mongoose.model('Bus', busSkema);

module.exports = Bus;
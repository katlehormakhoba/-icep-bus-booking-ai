const Bus = require('../models/busModel');
const catchAsync = require('../utils/catchAsync');
const factoryHandler = require('./factoryHandler');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');


const checkBusExp = catchAsync( async(req, res, next) => {
    
    const bus = await Bus.find({isActive:true});

    // console.log(bus.length)
    if(bus.length <1){
        return 0;
    }

  
    const busBookings =  await Booking.find({bus:bus._id})

    if(busBookings.length == bus[0].seats || bus[0].expDate <= Date()){
        bus[0].isActive = false;
        await bus[0].save({ validateBeforeSave: false });
        return 0;
    }
    
    // next();
})

//Making fuction is Good practice But WILL HAVE TO CHANGE ALOT OF THINGS, SO FOR NO ITS A NO!!
exports.checkActiveBus = catchAsync( async( req, res, next) => {

    
    const doc = await Bus.find({isActive:true});

    console.log(doc)

    if(doc.length > 0){
        return next(new AppError('Sorry There is Active Bus Available', 404));
        
    }

    next();
})
// setInterval(function(){ 

//     checkBusExp();
//     console.log("hi")
// },1* 60000)

const getBus = (filter) => catchAsync( async( req, res, next) => {

    // console.log(filter)
    
    const bus = await Bus.find(filter);

    console.log(bus)
    if(bus.length < 1){
        return next(new AppError('Sorry bus as not found', 404));
    }

    const bookings = await Booking.find({bus:bus._id});

    const availableSeats = bus[0].seats - bookings.length

    const results= bus.length
    // console.log("Bus",bus)
    res.status(200).json({
        status: 'success',
        data: bus,
        availableSeats

    })

})

exports.getActiveBusses = getBus({isActive:true});
exports.getInactiveBusses = getBus({isActive:false});
exports.getBus = factoryHandler.getOne(Bus)
exports.createBus = factoryHandler.createOne(Bus);
exports.updateBus = factoryHandler.updateOne(Bus);
exports.deleteBus = factoryHandler.deleteOne(Bus);

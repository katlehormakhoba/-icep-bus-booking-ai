const Booking = require('../models/bookingModel');
const Bus = require('../models/busModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const factoryHandler = require('./factoryHandler');

//{createdAt:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}}

exports.checkBusLimit = catchAsync( async( req, res, next) => {

    
    const doc = await Bus.find({_id:req.params.id});

    if(!doc){
        return next(new AppError('No docment found with that ID', 404));
    }

    const results= doc.length
    console.log("Bus",doc)
    // res.status(200).json({
    //     status: 'success',
    //     data: doc
    // })

    const busBookings =  await Booking.find({bus:req.params.id})

    console.log(Date() , doc[0].expDate )
    if(busBookings.length == doc.seats || doc[0].expDate <= Date() ){
        return next(new AppError('Sorry bus is full or has left', 400));
    } 
    console.log("Booking",busBookings)

    next();
})

exports.setBusUserIds = (req, res, next) => {

    //FOR CREATING USER ORDERS BY SETTING PRODUCT ID USING FACTORY HANDLER
    if (!req.body.bus) {
        req.body.bus = req.params.id;
    }

    //FOR CREATING USER ORDERS BY SETTING USER ID USING FACTORY HANDLER
    if (!req.body.user) {
        req.body.user = req.user.id;
    }

    //FOR GETTING USER ORDERS USING FACTORY HANDLER
    if (!req.params.userId) {
        req.params.userId = req.user.id;
    }

    next();
}

exports.getAllBookings = factoryHandler.getAll(Booking);
exports.getMyBookings = factoryHandler.getAll(Booking);
exports.getBooking = factoryHandler.getOne(Booking)
exports.createBooking = factoryHandler.createOne(Booking);
exports.updateBooking = factoryHandler.updateOne(Booking);
exports.deleteBooking = factoryHandler.deleteOne(Booking);




// exports.getAllProducts = catchAsync(async (req, res, next) => {

//     console.log(req.query);
//     const features = new APIFeatures(Product.find(), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();

//     const products = await features.query;

//     res.status(200).json({
//         status: "success",
//         results: products.length,
//         data: products
//     })


// })



// exports.getProduct = catchAsync(async (req, res, next) => {
//     const product = await Product.findById(req.params.id).populate('reviews');

//     if(!product){
//         return next(new c('No product found with that ID', 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         data: product
//     })

// })
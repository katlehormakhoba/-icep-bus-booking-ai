const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const factoryHandler = require('./factoryHandler');


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
const Bus = require('../models/busModel');
const catchAsync = require('../utils/catchAsync');
const factoryHandler = require('./factoryHandler');
const AppError = require('../utils/appError');


exports.checkActiveBus = catchAsync( async( req, res, next) => {

    
    const doc = await Bus.find({isActive:true});


    if(doc){
        return next(new AppError('Sorry There is Active Bus Available', 404));
        
    }


    next();
})


exports.getAllBusses = factoryHandler.getAll(Bus);
exports.getBus = factoryHandler.getOne(Bus)
exports.createBus = factoryHandler.createOne(Bus);
exports.updateBus = factoryHandler.updateOne(Bus);
exports.deleteBus = factoryHandler.deleteOne(Bus);

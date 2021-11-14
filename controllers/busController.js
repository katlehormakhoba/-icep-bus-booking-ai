const Bus = require('../models/busModel');
const factoryHandler = require('./factoryHandler');




exports.getAllBusses = factoryHandler.getAll(Bus);
exports.getBus = factoryHandler.getOne(Bus)
exports.createBus = factoryHandler.createOne(Bus);
exports.updateBus = factoryHandler.updateOne(Bus);
exports.deleteBus = factoryHandler.deleteOne(Bus);

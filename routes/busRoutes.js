const router = require('express').Router();
const busController = require('../controllers/busController');
const reviewRoutes = require('./reviewRoutes');
const cartRoutes = require('./cartRoutes');
const authController = require('../controllers/authController');

//MIDDLEWARE 
router.use('/:productId/reviews', reviewRoutes);


// router.param('id', (req, res, next, val) => {
//     console.log(`this is our id: ${val}`);

//     next();
// })

// router.route('/product-stats')
//     .get(authController.protect, authController.restrictTo('admin'), productController.getProductStats);

router.route('/').get(busController.getAllBusses)
    .post(busController.checkActiveBus, busController.createBus);

router.route('/:id')
    .get(busController.getBus)
    .patch(authController.protect, authController.restrictTo('admin'), busController.updateBus)
    .delete(authController.protect, authController.restrictTo('admin'), busController.deleteBus)



module.exports = router;
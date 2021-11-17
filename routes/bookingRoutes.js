const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
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



router.route('/myBookings').get(authController.protect, bookingController.setBusUserIds, bookingController.getMyBookings)
router.route('/').get(bookingController.getAllBookings)
    .post(authController.protect, bookingController.createBooking);

router.route('/:id')
    .get(authController.protect, bookingController.getBooking)
    .patch(authController.protect, bookingController.updateBooking)
    .delete(authController.protect, bookingController.deleteBooking)
    .post(authController.protect, bookingController.setBusUserIds, bookingController.checkBusLimit, bookingController.createBooking)




module.exports = router;
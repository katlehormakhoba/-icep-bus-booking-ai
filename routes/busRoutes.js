const router = require('express').Router();
const busController = require('../controllers/busController');

const authController = require('../controllers/authController');

//MIDDLEWARE 

// router.param('id', (req, res, next, val) => {
//     console.log(`this is our id: ${val}`);

//     next();
// })


router.route('/inactive')
    .get(busController.getInactiveBusses);

router.route('/')
    .get(busController.getActiveBusses)
    .post(busController.checkActiveBus, busController.createBus);

router.route('/:id')
    .get(busController.getBus)
    .patch(authController.protect, authController.restrictTo('admin'), busController.updateBus)
    .delete(authController.protect, authController.restrictTo('admin'), busController.deleteBus);



module.exports = router;
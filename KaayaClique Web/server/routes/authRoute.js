const express = require('express');
const router = express.Router();

const { registerController, 
        loginController, 
        testController, 
        updateProfileController, 
        getOrdersController,
        getAllOrdersController,
        orderStatusController } = require('../controllers/authController.js');
const { requireLogin, requireAdmin} = require('../middlewares/authMiddleware.js')

// signup route
router.post('/register', registerController);

// login route
router.post('/login', loginController);

// user authentication protected routes
router.get('/userauth', requireLogin, (req, res) => {
    res.status(200).send({ok: true });
});

// admin authentication protected routes
router.get('/adminauth', requireLogin, requireAdmin, (req, res) => {
    res.status(200).send({ok: true });
});

// test route
router.get('/test', requireLogin, requireAdmin, testController);

// update user
router.put('/profile', requireLogin, updateProfileController);

// orders
router.get('/orders', requireLogin, getOrdersController);

// all orders- admin
router.get('/all-orders', requireLogin, requireAdmin, getAllOrdersController);

// order status update
router.put('/order-status/:orderId', requireLogin, requireAdmin, orderStatusController);
module.exports = router;
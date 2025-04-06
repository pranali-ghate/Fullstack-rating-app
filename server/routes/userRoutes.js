// userRoutes.js
const express = require('express');
const router = express.Router();
const { getStores, rateStore } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.use(auth, authorize('user'));
router.get('/stores', getStores);
router.post('/rate', rateStore);

module.exports = router;

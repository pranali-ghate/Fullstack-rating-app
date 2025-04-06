// storeRoutes.js
const express = require('express');
const router = express.Router();
const { getMyStore, updateStore } = require('../controllers/storeController');
const auth = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.use(auth, authorize('store_owner'));
router.get('/mystore', getMyStore);
router.put('/mystore', updateStore);

module.exports = router;

// adminRoutes.js
const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, toggleUserStatus } = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.use(auth, authorize('admin'));
router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/toggle', toggleUserStatus);

module.exports = router;

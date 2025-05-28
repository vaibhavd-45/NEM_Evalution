const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/AuthMiddleware.js');


router.post('/jobs', authMiddleware('admin'), adminController.createJob);
router.get('/jobs', authMiddleware('admin'), adminController.getJobs);
router.put('/jobs/:id', authMiddleware('admin'), adminController.updateJob);
router.delete('/jobs/:id', authMiddleware('admin'), adminController.deleteJob);


module.exports = router;
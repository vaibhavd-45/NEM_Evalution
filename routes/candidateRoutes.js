const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const authMiddleware = require('./middleware/AuthMiddleware.js');


router.post('/signup', candidateController.signup);
router.post('/login', candidateController.login);
router.get('/jobs', authMiddleware('candidate'), candidateController.viewJobs);
router.post('/jobs/:id/apply', authMiddleware('candidate'), candidateController.applyForJob);
router.delete('/jobs/:id/withdraw', authMiddleware('candidate'), candidateController.withdrawApplication);


module.exports = router;
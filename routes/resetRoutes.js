const express = require('express');
const router = express.Router();
const resetController = require('../controllers/resetController'); // Adjust path as needed

// Route to request password reset
router.post('/request-password-reset', resetController.requestPasswordReset);

// Route to reset password
router.post('/reset-password/:token', resetController.resetPassword);

module.exports = router;

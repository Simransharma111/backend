const express = require('express');
const router = express.Router();
const { registerUser, loginUser,logoutUser } = require('../controllers/authController');

router.post('https://backend-gamma-nine-69.vercel.app/register', registerUser);
router.post('/login', loginUser);
router.delete('/logout', logoutUser);

module.exports = router;

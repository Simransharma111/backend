// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

// Handle form submission and image upload
router.post('/', authMiddleware, uploadMiddleware, uploadController.createUploadDetail);

// Get all uploads
router.get('/', uploadController.handleall);

// Get user-specific uploads
router.get('/user', authMiddleware, uploadController.getUserUploads);

// Get rooms by type
router.get('/type', uploadController.getRoomsByType);

// Update specific upload
router.put('/:id', authMiddleware, uploadMiddleware, uploadController.updateUploadDetail);

// Delete specific upload
router.delete('/:id', authMiddleware, uploadController.deleteUploadDetail);

module.exports = router;

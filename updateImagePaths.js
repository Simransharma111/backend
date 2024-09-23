const mongoose = require('mongoose');
const path = require('path');
const UploadDetail = require('./models/UploadDetail'); // Adjust path as necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

async function updatePaths() {
  try {
    const rooms = await UploadDetail.find({});
    for (const room of rooms) {
      if (room.images && room.images.length > 0) {
        room.images = room.images.map(imagePath => {
          // Extract filename from the absolute path
          return path.basename(imagePath);
        });
        await room.save();
      }
    }
    console.log('Paths updated successfully!');
  } catch (error) {
    console.error('Error updating paths:', error);
  } finally {
    mongoose.connection.close();
  }
}

updatePaths();

const UploadDetail = require('../models/UploadDetail');
const User = require('../models/User'); 

// Handle form submission and image upload
exports.createUploadDetail = async (req, res) => {
  try {
      if (!req.user) {
          return res.status(401).json({ msg: 'Unauthorized' });
      }

      const userId = req.user.userId;
      let { name, mobileNumber, typeOfRooms, singleRoomRange, doubleRoomRange, facilities, near, distanceFromRoad, availableFor, currentlyAvailable, description } = req.body;

      // Ensure typeOfRooms and facilities are arrays
      if (typeof typeOfRooms === 'string') {
          typeOfRooms = typeOfRooms.split(',').map(item => item.trim());
      }

      if (typeof facilities === 'string') {
          facilities = facilities.split(',').map(item => item.trim());
      }

      const images = req.files ? req.files.map(file => file.filename) : [];

      const uploadDetail = new UploadDetail({
          userId,
          name,
          mobileNumber,
          typeOfRooms:JSON.parse(typeOfRooms), // Now guaranteed to be an array
          singleRoomRange,
          doubleRoomRange,
          facilities: JSON.parse(facilities), // Now guaranteed to be an array
          near,
          distanceFromRoad,
          availableFor,
          currentlyAvailable,
          description,
          images
      });

      await uploadDetail.save();
      res.status(201).json({ message: 'Details uploaded successfully!', data: uploadDetail });
  } catch (error) {
      console.error('Error uploading details:', error);
      res.status(500).json({ message: 'Error uploading details', error: error.message });
  }
};

 exports.handleall= async (req, res) => {
    try {
      const uploads = await UploadDetail.find();
      res.json(uploads);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  }

 

  // Retrieve user uploads based on userId or email
exports.getUserUploads = async (req, res) => {
  const { userId, email } = req.query;

  if (!userId && !email) {
    return res.status(400).json({ msg: 'User ID or Email is required' });
  }

  try {
    let user;

    if (userId) {
      // If you have a string-based userId, find the corresponding user
      user = await User.findOne({ userId });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Query based on the string userId
    const uploads = await UploadDetail.find({ userId: user.userId });
    res.json(uploads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.updateUploadDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...updateData } = req.body;

    if (req.files) {
      updateData.images = req.files.map(file => file.filename);
    }

    const uploadDetail = await UploadDetail.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });

    if (!uploadDetail) return res.status(404).json({ msg: 'Upload not found' });

    res.json({ message: 'Details updated successfully!', data: uploadDetail });
  } catch (error) {
    console.error('Error updating details:', error);
    res.status(500).json({ message: 'Error updating details', error: error.message });
  }
};

// Delete upload details
exports.deleteUploadDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const uploadDetail = await UploadDetail.findOneAndDelete({ _id: id, userId });

    if (!uploadDetail) return res.status(404).json({ msg: 'Upload not found' });

    res.json({ message: 'Upload deleted successfully!' });
  } catch (error) {
    console.error('Error deleting details:', error);
    res.status(500).json({ message: 'Error deleting details', error: error.message });
  }
};
  
// Retrieve filtered room details based on type
exports.getRoomsByType = async (req, res) => {
  const { type } = req.query;

  try {
      const rooms = await UploadDetail.find({ typeOfRooms: type });
      res.json(rooms);
  } catch (err) {
      res.status(500).json({ msg: 'Server error' });
  }
};

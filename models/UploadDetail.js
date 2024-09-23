// models/UploadDetail.js
const mongoose = require('mongoose');

const uploadDetailSchema = new mongoose.Schema({
    userId: { type: String, ref: 'User' }, 
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    typeOfRooms: {
        type: [String],
        required: true
    },
    singleRoomRange: {
        type: String,
      
    },
    doubleRoomRange: {
        type: String,
       
    },
    facilities: {
        type: [String],
        enum: ['Almirah', 'Fan', 'Water', 'Washroom', 'Kitchen', 'Geyser', 'Wifi', 'Furniture', 'Balcony', 'AC', 'Parking']
    },
    near: {
        type: String,
        required: true
    },
    distanceFromRoad: {
        type: String
    },
    availableFor: {
        type: String,
      
    },
    currentlyAvailable: {
        type: Boolean,
    },
    description: {
        type: String
    },
    images: {
        type: [String]
    }
});

module.exports = mongoose.model('UploadDetails', uploadDetailSchema);

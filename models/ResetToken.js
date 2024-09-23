const mongoose = require('mongoose');

const ResetTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true }
});

module.exports = mongoose.model('ResetToken', ResetTokenSchema);

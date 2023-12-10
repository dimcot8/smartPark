// models/SavedVehicle.js
const mongoose = require('mongoose');

const savedVehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SavedVehicle = mongoose.model('SavedVehicle', savedVehicleSchema);

module.exports = SavedVehicle;

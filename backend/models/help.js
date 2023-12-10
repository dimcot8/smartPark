// models/Help.js
const mongoose = require('mongoose');

const helpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Help = mongoose.model('Help', helpSchema);

module.exports = Help;

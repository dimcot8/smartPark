// routes/api/savedVehicles.js
const express = require('express');
const router = express.Router();
const SavedVehicle = require('../../models/SavedVehicle');

// Get all saved vehicles
router.get('/', async (req, res) => {
  try {
    const savedVehicles = await SavedVehicle.find();
    res.json(savedVehicles);
  } catch (error) {
    console.error('Error fetching saved vehicles:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new saved vehicle
router.post('/', async (req, res) => {
  const { make, model, plateNumber } = req.body;

  if (!make || !model || !plateNumber) {
    return res.status(400).json({ error: 'Please provide make, model, and plateNumber' });
  }

  try {
    const newVehicle = new SavedVehicle({ make, model, plateNumber });
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error('Error adding vehicle:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
    const vehicleId = req.params.id;
  
    try {
      // Ensure the correct method is used to remove the document
      const result = await SavedVehicle.deleteOne({ _id: vehicleId });
      if (result.deletedCount === 1) {
        res.json({ message: 'Vehicle removed successfully' });
      } else {
        res.status(404).json({ error: 'Vehicle not found' });
      }
    } catch (error) {
      console.error('Error removing vehicle:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;

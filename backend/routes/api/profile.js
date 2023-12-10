// routes/api/profiles.js

const express = require('express');
const router = express.Router();
const UserProfile = require('../../models/profile');

// Get all user profiles
router.get('/', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find();
    res.json(userProfiles);
  } catch (error) {
    console.error('Error fetching user profiles:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new user profile or update an existing one
router.post('/', async (req, res) => {
  const { username, email, age } = req.body;

  try {
    if (req.body._id) {
      // If _id is provided, update the existing profile
      const updatedProfile = await UserProfile.findByIdAndUpdate(
        req.body._id,
        { username, email, age },
        { new: true }
      );
      res.json(updatedProfile);
    } else {
      // If _id is not provided, add a new profile
      const newUserProfile = new UserProfile({ username, email, age });
      const savedUserProfile = await newUserProfile.save();
      res.status(201).json(savedUserProfile);
    }
  } catch (error) {
    console.error('Error adding/updating user profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const profileId = req.params.id;

  try {
    // Ensure the correct method is used to remove the document
    const result = await UserProfile.deleteOne({ _id: profileId });
    if (result.deletedCount === 1) {
      res.json({ message: 'User profile removed successfully' });
    } else {
      res.status(404).json({ error: 'User profile not found' });
    }
  } catch (error) {
    console.error('Error removing user profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
    
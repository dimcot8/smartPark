// routes/api/help.js
const express = require("express");
const router = express.Router();
const Help = require('../../models/help');
// Handle form submission
router.post('/submit', async (req, res) => {
    const { name, email, problem } = req.body;
  
    // Basic validation, you can add more validation as needed
    if (!name || !email || !problem) {
      return res.status(400).json({ error: 'Please fill in all fields' });
    }
  
    try {
      // Create a new Help instance
      const newHelp = new Help({
        name,
        email,
        problem,
      });
  
      // Save the instance to the database
      const savedHelp = await newHelp.save();
  
      // Log the saved instance to the console (for demonstration purposes)
      console.log('Form submitted and saved to the database:', savedHelp);
  
      // Respond with a success message
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error saving to the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const { location } = req.query;

    const googleMapsAPIKey = "AIzaSyD3q0Mxt9mnz2s3PcSAHez5tJbXvbje8_Y";

    const googleMapsAPIURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=parking+${location}&key=${googleMapsAPIKey}`;

    const response = await axios.get(googleMapsAPIURL);

    const googleMapsParkingSpots = response.data.results.map((result) => ({
      name: result.name,
      location: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    }));

    console.log(googleMapsParkingSpots);
    res.json(googleMapsParkingSpots);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;

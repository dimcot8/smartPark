import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./searchBar.js";
import SpotList from "./spotList.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../../styles/SearchPage.css";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

function SearchPage() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [selectedSpot, setSelectedSpot] = useState(null);
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: -34.397, lng: 150.644 });

  useEffect(() => {
    // When the component mounts, remove duplicates from favorites in local storage
    const favoriteSpots =
      JSON.parse(localStorage.getItem("favoriteSpots")) || [];
    const uniqueFavorites = Array.from(
      new Set(favoriteSpots.map((spot) => spot.address))
    ).map((address) => favoriteSpots.find((spot) => spot.address === address));

    localStorage.setItem("favoriteSpots", JSON.stringify(uniqueFavorites));
  }, []);
  const handleAddToFavorites = (spot) => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("favoriteSpots")) || [];

    const isAlreadyInFavorites = existingFavorites.some(
      (favSpot) => favSpot.address === spot.address
    );

    if (!isAlreadyInFavorites) {
      const updatedFavorites = [...existingFavorites, spot];
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      alert(`${spot.name} added to favorites!`);
    } else {
      alert("Spot is already in favorites!");
    }
  };

  const handleSearchSubmit = async (location) => {
    try {
      let latlng;

      // Check if the user has provided a location
      if (location.trim() === "") {
        // If no location provided, get the user's current location
        const position = await getCurrentLocation();
        latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      } else {
        // If a location is provided, get its coordinates using Geocoding
        const geocodeResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyD3q0Mxt9mnz2s3PcSAHez5tJbXvbje8_Y`
        );
        const geocodeData = await geocodeResponse.json();

        if (geocodeData.results && geocodeData.results.length > 0) {
          latlng = geocodeData.results[0].geometry.location;
        } else {
          console.log("No Geocoding Results Found");
          return;
        }
      }

      setMapCenter(latlng);

      const BACKEND_ENDPOINT = `http://localhost:4000/api/search?location=${location}`;
      const parkingResponse = await fetch(BACKEND_ENDPOINT);
      if (!parkingResponse.ok) {
        throw new Error(
          `Server responded with ${parkingResponse.status}: ${parkingResponse.statusText}`
        );
      }
      const parkingData = await parkingResponse.json();

      if (parkingData && parkingData.length > 0) {
        const spots = parkingData.map((spot) => {
          const distance = calculateDistance(
            latlng.lat,
            latlng.lng,
            spot.lat,
            spot.lng
          );

          return {
            id: spot.id || Math.random().toString(36).substr(2, 9),
            name: spot.name,
            address: spot.location,
            price: "Not specified",
            lat: spot.lat,
            lng: spot.lng,
            distance: distance.toFixed(2),
          };
        });

        const sortedSpots = [...spots].sort((a, b) => a.distance - b.distance);
        setResults(sortedSpots);
      } else {
        console.log("No Parking Spots Found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to get the user's current location using the Geolocation API
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error)
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const handleBookNow = (spot) => {
    navigate(`/spot/${spot.location}`, { state: { spot } });
  };

  return (
    <div className="searchtab">
      <div className="search-container">
        <div className="panel-heading3">
          {" "}
          Enter your desired destination address here...
        </div>

        <SearchBar
          onSearch={handleSearchSubmit}
          inputClassName="search-input"
          buttonClassName="search-button"
        />

        <LoadScript googleMapsApiKey="AIzaSyD3q0Mxt9mnz2s3PcSAHez5tJbXvbje8_Y">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={mapCenter}
            zoom={14}
            ref={mapRef}
          >
            {results.map((spot, index) => (
              <Marker
                key={index}
                position={{ lat: spot.lat, lng: spot.lng }}
                title={spot.name}
                onClick={() => setSelectedSpot(spot)}
              >
                {selectedSpot && selectedSpot.id === spot.id && (
                  <InfoWindow
                    position={{ lat: selectedSpot.lat, lng: selectedSpot.lng }}
                    onCloseClick={() => setSelectedSpot(null)}
                  >
                    <div>
                      <h4>{selectedSpot.name}</h4>
                      <p>{selectedSpot.address}</p>
                      <p>{selectedSpot.distance}km</p>
                      <button
                        onClick={() => handleAddToFavorites(selectedSpot)}
                        className="favorite-btn-2"
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                      <button
                        onClick={() => handleBookNow(selectedSpot)}
                        className="book-now-btn"
                      >
                        Book Now
                      </button>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        </LoadScript>
        <SpotList
          spots={results}
          onBookNow={handleBookNow}
          onAddToFavorites={handleAddToFavorites}
        />
      </div>
    </div>
  );
}

export default SearchPage;

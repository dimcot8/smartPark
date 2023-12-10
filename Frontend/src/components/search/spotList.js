import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../styles/spotList.css";

function SpotList({ spots, onBookNow, onAddToFavorites }) {
  const navigate = useNavigate();
  console.log("SpotList Props:", spots);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteSpots")) || []
  );

  const isSpotInFavorites = (spot) => {
    return favorites.some((favorite) => favorite.id === spot.id);
  };

  const handleBookNow = (spot) => {
    console.log(spot);
    navigate(`/spot/${spot.address}`, { state: { spot } });
  };

  const handleAddToFavorites = (spot) => {
    const isAlreadyInFavorites = favorites.some(
      (favSpot) => favSpot.address === spot.address
    );

    if (!isAlreadyInFavorites) {
      const updatedFavorites = [...favorites, spot];
      setFavorites(updatedFavorites);
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      alert(`${spot.name} added to favorites!`);
    } else {
      alert("Spot is already in favorites!");
    }
  };

  return (
    <div className="spot-list">
      <h3>Parking Spots</h3>

      {spots.map((spot, index) => (
        <div key={index} className="spot-tile">
          <h4>{spot.name}</h4>
          <p>{spot.address}</p>
          <p>{spot.distance} KM</p>
          <button onClick={() => handleBookNow(spot)} className="book-now-btn">
            Book Now
          </button>
          <button
            onClick={() => handleAddToFavorites(spot)}
            className={`favorite-btn ${
              isSpotInFavorites(spot) ? "favorited" : ""
            }`}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default SpotList;

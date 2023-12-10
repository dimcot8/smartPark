import React from "react";
import { useLocation } from "react-router-dom";

function BookingPage() {
  const location = useLocation();
  const { spot } = location.state || {};

  if (!spot) {
    return <div>No spot information available</div>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Name: {spot.name}</p>
      <p>Address: {spot.address}</p>
      <p>Distance: {spot.distance}km</p>
      <button>Confirm Booking</button>
    </div>
  );
}

export default BookingPage;

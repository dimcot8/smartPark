import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import "../styles/reservationInfo.css";

const ReservationTracking = () => {
  const [status, setStatus] = useState("Pending");

  const location = useLocation();
  const { spot, enteredName, enteredPhoneNumber, enteredEmail, price } =
    location.state || {};
  const reservationId = uuidv4();
  const navigate = useNavigate();

  const cancelReservation = () => {
    const updatedStatus = "Cancelled";
    setStatus(updatedStatus);
    alert("Reservation Cancelled!");

    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    const updatedReservations = storedReservations.map((reservation) => {
      if (reservation.spot.id === spot.id) {
        return { ...reservation, status: updatedStatus };
      }
      return reservation;
    });
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  };

  const completeReservation = () => {
    const updatedStatus = "Completed";
    setStatus(updatedStatus);
    alert("You have completed the reservation!");

    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    const updatedReservations = storedReservations.map((reservation) => {
      if (reservation.spot.id === spot.id) {
        return { ...reservation, status: updatedStatus };
      }
      return reservation;
    });
    localStorage.setItem("reservations", JSON.stringify(updatedReservations));
  };

  useEffect(() => {
    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    const existingReservation = storedReservations.find(
      (reservation) => reservation.spot.id === spot.id
    );

    if (existingReservation) {
      setStatus(existingReservation.status);
    } else {
      const reservationData = {
        reservationId,
        spot,
        enteredName,
        enteredPhoneNumber,
        enteredEmail,
        price,
        status,
      };

      const updatedReservations = [...storedReservations, reservationData];
      localStorage.setItem("reservations", JSON.stringify(updatedReservations));
    }

    navigate("/payment");
  }, [
    reservationId,
    spot,
    enteredName,
    enteredPhoneNumber,
    enteredEmail,
    price,
    status,
    navigate,
  ]);

  return (
    <div className="reservation-tracking">
      <div className="account-container">
        <div className="panel">
          <div className="panel-heading">Reservation Tracking</div>
          <br></br>
          <div className="spot-details-content">
            <h3>Parking Information</h3>
            <p className="spot-detail">Name: {spot.name}</p>
            <p className="spot-detail">Address: {spot.address}</p>
            <p className="spot-detail">
              Distance from the address: {spot.distance} KM
            </p>
            <p className="spot-detail">Price: ${price}</p>
          </div>
          <div className="info-section">
            <br></br>
            <h3>Customer Information</h3>
            <div className="entered-values">
              <p>Full Name: {enteredName}</p>
              <p>Phone Number: {enteredPhoneNumber}</p>
              <p>Email: {enteredEmail}</p>
            </div>
          </div>
          <br></br>
          <div className="status-section">
            <h3>Reservation Status</h3>
            <p>Status: {status}</p>
          </div>
          <br></br>
          <button onClick={completeReservation} className="btn btn-danger">
            Complete Reservation
          </button>
          <button onClick={cancelReservation} className="btn btn-danger">
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationTracking;

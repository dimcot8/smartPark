import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import '../styles/reservationInfo.css';

const ReservationInfo2 = () => {
  const [reservation, setReservation] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const reservationId = id;

    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const selectedReservation = storedReservations.find(res => res.reservationId === reservationId);

    if (selectedReservation) {
      setReservation(selectedReservation);
      updateStatusMessage(selectedReservation.status);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const updateStatusMessage = (status) => {
    switch (status) {
      case 'Pending':
        setStatusMessage('This reservation is still in progress...');
        break;
      case 'Cancelled':
        setStatusMessage('This reservation is cancelled!');
        break;
      case 'Completed':
        setStatusMessage('You have completed this reservation!');
        setIsButtonDisabled(true);
        break;
      default:
        setStatusMessage('');
    }
  };

  const cancelReservation = () => {
    const updatedStatus = 'Cancelled';
    setReservation((prevReservation) => ({ ...prevReservation, status: updatedStatus }));
    alert('Reservation Cancelled!');
    setIsButtonDisabled(true);

    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedReservations = storedReservations.map(reservation => {
      if (reservation.reservationId === id) {
        return { ...reservation, status: updatedStatus };
      }
      return reservation;
    });
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));

    updateStatusMessage(updatedStatus);
  };

  const completeReservation = () => {
    const updatedStatus = 'Completed';
    setReservation((prevReservation) => ({ ...prevReservation, status: updatedStatus }));
    alert('You have completed the reservation!');
    setIsButtonDisabled(true);

    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const updatedReservations = storedReservations.map(reservation => {
      if (reservation.reservationId === id) {
        return { ...reservation, status: updatedStatus };
      }
      return reservation;
    });
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));

    updateStatusMessage(updatedStatus);
  };

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="reservation-tracking">
      <div className="account-container">
        <div className="panel">
          <div className="panel-heading">Your Reservation Information</div>
          <br />
          <div className="spot-details-content">
            <h3>Parking Information</h3>
            <p className="spot-detail">Name: {reservation.spot?.name}</p>
            <p className="spot-detail">Address: {reservation.spot?.address}</p>
            <p className="spot-detail">Distance from the address: {reservation.spot?.distance} KM</p>
            <p className="spot-detail">Price: ${reservation.price}</p>
          </div>
          <div className="info-section">
            <br />
            <h3>Customer Information</h3>
            <div className="entered-values">
              <p>Full Name: {reservation.enteredName}</p>
              <p>Phone Number: {reservation.enteredPhoneNumber}</p>
              <p>Email: {reservation.enteredEmail}</p>
            </div>
          </div>
          <br />
          <div className="status-section">
            <p>Reservation Status</p>
            <p>Status: {reservation.status}</p>

            {statusMessage && <h3 style={{ color: statusMessage.includes('cancelled') ? 'red' : 'green' }}>{statusMessage}</h3>}
          </div>
          <br />
          <button onClick={completeReservation} className="btn btn-danger" disabled={isButtonDisabled}>
            Complete Reservation
          </button>
          <button onClick={cancelReservation} className="btn btn-danger" disabled={isButtonDisabled}>
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationInfo2;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/reservation.css';
import { useLocation, Link, useNavigate } from "react-router-dom";
const ReservationTab = () => {
    const location = useLocation();
    const emailFromLogin =
      location.state?.email || localStorage.getItem("userEmail") || "Guest";
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState("Settings");
    const [user, setUser] = useState({ email: null });
    const [reservations, setReservations] = useState([]);
    const [showAllReservations, setShowAllReservations] = useState(false);
  
  
  useEffect(() => {
    localStorage.setItem("userEmail", emailFromLogin);

    setTimeout(() => {
      setIsAuthenticated(true);
      setUser({ email: emailFromLogin });
    }, 100);

    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];
    setReservations(storedReservations.reverse());
  }, [emailFromLogin]);


  const clearReservations = () => {
    // Clear reservations in local storage
    localStorage.removeItem("reservations");
    setReservations([]);
  };

  const toggleAllReservations = () => {
    setShowAllReservations(!showAllReservations);
  };

  return (
    <div className="saved-vehicles-tab2">
      <div className="panel2">
        <div className="panel-heading2">Your Reservation</div>
        <div className="panel-content2">
        {reservations.length === 0 ? (
                          <p>No reservations yet!</p>
                        ) : (
                          <>
                            <br />
                            {showAllReservations ? (
                              <ul className="reservation-list">
                                {reservations.map((reservation, index) => (
                                  <ReservationItem
                                    key={index}
                                    reservation={reservation}
                                  />
                                ))}
                              </ul>
                            ) : (
                              <ul className="reservation-list">
                                {reservations
                                  .slice(0, 5)
                                  .map((reservation, index) => (
                                    <ReservationItem
                                      key={index}
                                      reservation={reservation}
                                    />
                                  ))}
                              </ul>
                            )}
                            {reservations.length > 5 &&
                              !showAllReservations && (
                                <button
                                  className="btn btn-secondary"
                                  onClick={toggleAllReservations}
                                >
                                  Show More
                                </button>
                              )}
                            {reservations.length > 5 && showAllReservations && (
                              <button
                                className="btn btn-secondary"
                                onClick={toggleAllReservations}
                              >
                                Show Less
                              </button>
                            )}
                            <button
                              className="btn btn-danger"
                              onClick={clearReservations}
                            >
                              Clear Reservations
                            </button>
                            <br />
                            <button
                              className="btn btn-secondary"
                              onClick={toggleAllReservations}
                            >
                              {showAllReservations
                                ? "Hide History"
                                : "Show History"}
                            </button>
                          </>
                        )}
        </div>
      </div>
    </div>
  );
};

function ReservationItem({ reservation }) {
    return (
      <ol className="reservation-item">
        <div className="reservation-details">
          <Link
            to={`/reservations/${reservation.reservationId}`}
            className="reservation-link"
          >
            <p className="reservation-name">{`Reservation #${reservation.spot.id}`}</p>
          </Link>
          <p className="reservation-name">Spot Name: {reservation.spot.name}</p>
          <p className="reservation-address">
            Spot Address: {reservation.spot.address}
          </p>
          <p className="reservation-status">
            Reservation Status: {reservation.status}
          </p>
        </div>
        <br />
      </ol>
    );
  }
  
export default ReservationTab;

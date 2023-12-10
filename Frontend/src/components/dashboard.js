// Dashboard.js

import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import { useLocation, Link } from "react-router-dom";
import SavedVehiclesTab from "../components/SavedVehiclesPage";
import FavoriteSpotItem from "../components/favoriteSpotItem";
import Reservationtab from "../components/reservation";
import ProfileTab from "../components/profile";
import SearchPage from "./search/searchPage";

export default function Dashboard() {
  const location = useLocation();

  const emailFromLogin =
    location.state?.email || localStorage.getItem("userEmail") || "Guest";

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [activeTab, setActiveTab] = useState("Settings");

  const [user, setUser] = useState({ email: null });

  const [reservations, setReservations] = useState([]);

  const [showAllReservations, setShowAllReservations] = useState(false);

  const [favoriteSpots, setFavoriteSpots] = useState([]);

  const [showAllFavorites, setShowAllFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem("userEmail", emailFromLogin);

    setTimeout(() => {
      setIsAuthenticated(true);

      setUser({ email: emailFromLogin });
    }, 100);

    const storedReservations =
      JSON.parse(localStorage.getItem("reservations")) || [];

    setReservations(storedReservations.reverse());

    const storedFavoriteSpots =
      JSON.parse(localStorage.getItem("favoriteSpots")) || [];

    setFavoriteSpots(storedFavoriteSpots);
  }, [emailFromLogin]);

  const handleEmailChangeAlert = () => {
    window.alert("Contact an administrator to change your email");
  };

  const handlePasswordChangeAlert = () => {
    window.alert("Contact an administrator to change your password");
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const clearFavoriteSpots = () => {
    localStorage.removeItem("favoriteSpots");

    setFavoriteSpots([]);
  };

  const removeFavoriteSpot = (spotId) => {
    const updatedFavoriteSpots = favoriteSpots.filter(
      (favorite) => favorite.id !== spotId
    );

    localStorage.setItem(
      "favoriteSpots",

      JSON.stringify(updatedFavoriteSpots)
    );

    setFavoriteSpots(updatedFavoriteSpots);
  };

  const clearReservations = () => {
    localStorage.removeItem("reservations");

    setReservations([]);
  };

  const toggleAllReservations = () => {
    setShowAllReservations(!showAllReservations);
  };

  const toggleAllFavorites = () => {
    setShowAllFavorites(!showAllFavorites);
  };

  return (
    <div className="generic-page">
      {isAuthenticated ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="account-navigation">
                <div className="admin-links"></div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="account-container">
                <div className="tabs">
                  <p
                    className={`tab ${activeTab === "profile" && "active"}`}
                    onClick={() => handleTabClick("profile")}
                  >
                    Profile
                  </p>

                  <p
                    className={`tab ${activeTab === "Settings" && "active"}`}
                    onClick={() => handleTabClick("Settings")}
                  >
                    Settings
                  </p>

                  <p
                    className={`tab ${
                      activeTab === "Saved Vehicles" && "active"
                    }`}
                    onClick={() => handleTabClick("Saved Vehicles")}
                  >
                    Saved Vehicles
                  </p>

                  <p
                    className={`tab ${
                      activeTab === "Reservation Info" && "active"
                    }`}
                    onClick={() => handleTabClick("Reservation Info")}
                  >
                    Reservation Info
                  </p>

                  <p
                    className={`tab ${activeTab === "SearchPage" && "active"}`}
                    onClick={() => handleTabClick("SearchPage")}
                  >
                    Get a Spot
                  </p>

                  <button className="btn">
                    <Link to="/login" className="link">
                      Sign out
                    </Link>
                  </button>
                </div>

                {activeTab === "Settings" && (
                  <div className="account-settings-left">
                    <div className="panel open">
                      <div className="panel-heading">Sign-In Settings</div>

                      <div className="panel-content">
                        <h2>Email</h2>

                        <div className="account-email-wrapper">
                          <p>{user.email}</p>
                        </div>

                        <button
                          className="btn-link"
                          onClick={handleEmailChangeAlert}
                        >
                          Change
                        </button>

                        <br />

                        <h2>Password</h2>

                        <button
                          className="btn-link"
                          onClick={handlePasswordChangeAlert}
                        >
                          Change
                        </button>
                      </div>
                    </div>

                    <div className="panel">
                      <div className="panel-heading">Favorite Spots</div>

                      <div className="panel-content">
                        {favoriteSpots.length === 0 ? (
                          <p>No favorites saved yet.</p>
                        ) : (
                          <>
                            {showAllFavorites ? (
                              <ul className="favorite-spot-list">
                                {favoriteSpots.map((favorite, index) => (
                                  <div
                                    key={index}
                                    className="favorite-spot-item"
                                  >
                                    <FavoriteSpotItem favorite={favorite} />

                                    <button
                                      className="btn btn-remove"
                                      onClick={() =>
                                        removeFavoriteSpot(favorite.id)
                                      }
                                    >
                                      Remove
                                    </button>

                                    <hr />

                                    <br />
                                  </div>
                                ))}
                              </ul>
                            ) : (
                              <ul className="favorite-spot-list">
                                {favoriteSpots

                                  .slice(0, 5)

                                  .map((favorite, index) => (
                                    <div
                                      key={index}
                                      className="favorite-spot-item"
                                    >
                                      <FavoriteSpotItem favorite={favorite} />

                                      <button
                                        className="btn btn-remove"
                                        onClick={() =>
                                          removeFavoriteSpot(favorite.id)
                                        }
                                      >
                                        Remove
                                      </button>

                                      <hr />

                                      <br />
                                    </div>
                                  ))}
                              </ul>
                            )}

                            {favoriteSpots.length > 5 && (
                              <button
                                className="btn btn-secondary"
                                onClick={toggleAllFavorites}
                              >
                                {showAllFavorites ? "Hide" : "Show All"}
                              </button>
                            )}

                            <br />

                            <button
                              className="btn btn-danger"
                              onClick={clearFavoriteSpots}
                            >
                              Clear All
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="panel">
                      <div className="panel-heading">Your Reservations</div>

                      <div className="panel-content">
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
                )}

                {activeTab === "Saved Vehicles" && <SavedVehiclesTab />}

                {activeTab === "profile" && <ProfileTab />}

                {activeTab === "SearchPage" && <SearchPage />}

                {activeTab === "Reservation Info" && <Reservationtab />}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

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

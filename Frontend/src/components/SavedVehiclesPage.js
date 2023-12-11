import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SavedVehiclesPage.css';

const SavedVehiclesTab = () => {
  const [savedVehicles, setSavedVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', plateNumber: '' });

  useEffect(() => {
    fetchSavedVehicles();
  }, []);

  const fetchSavedVehicles = async () => {
    try {
      const response = await axios.get('https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/savedVehicles');
      setSavedVehicles(response.data);
      console.log(response.data); 
    } catch (error) {
      console.error('Error fetching saved vehicles:', error.message);
    }
  };

  const addSavedVehicle = async (vehicle) => {
    try {
      const response = await axios.post('https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/savedVehicles', vehicle);
      setSavedVehicles([...savedVehicles, response.data]);
      setNewVehicle({ make: '', model: '', plateNumber: '' });
    } catch (error) {
      console.error('Error adding vehicle:', error.message);
    }
  };

  const removeSavedVehicle = async (vehicleId) => {
    try {
      if (!vehicleId) {
        console.error('Invalid vehicleId:', vehicleId);
        return;
      }
  
      await axios.delete(`https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/savedVehicles/${vehicleId}`);
      setSavedVehicles(savedVehicles.filter((vehicle) => vehicle._id !== vehicleId));
    } catch (error) {
      console.error('Error removing vehicle:', error.message);
    }
  };

  return (
    <div className="saved-vehicles-tab">
      <div className="panel">
        <div className="panel-heading">Your Saved Vehicles</div>
        <div className="panel-content">
          {/* Render the list of saved vehicles */}
          {savedVehicles.length > 0 ? (
            <ul>
             {savedVehicles.map((vehicle) => (
  <li key={vehicle.id}>
    {vehicle.make} {vehicle.model} - {vehicle.plateNumber}
    <button onClick={() => {
      console.log("Removing vehicle with ID:", vehicle._id);
      removeSavedVehicle(vehicle._id);
    }}>Remove</button>
  </li>
))}
            </ul>
          ) : (
            <p>No saved vehicles yet.</p>
          )}

          {/* Add new vehicle form */}
          <h3>Add New Vehicle</h3>
          <label>Make:
            <input
              type="text"
              value={newVehicle.make}
              onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
            />
          </label>
          <label>Model:
            <input
              type="text"
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
            />
          </label>
          <label>Plate Number:
            <input
              type="text"
              value={newVehicle.plateNumber}
              onChange={(e) => setNewVehicle({ ...newVehicle, plateNumber: e.target.value })}
            />
          </label>
          <button onClick={() => addSavedVehicle(newVehicle)}>Add Vehicle</button>
        </div>
      </div>
    </div>
  );
};

export default SavedVehiclesTab;

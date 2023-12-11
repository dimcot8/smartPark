// Updated ProfileTab.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/profile.css';

const ProfileTab = () => {
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ username: '', email: '', age: '' });
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    try {
      const response = await axios.get('https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/profile');
      setProfiles(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user profiles:', error.message);
    }
  };

  const addUserProfile = async (profile) => {
    try {
      if (selectedProfile) {
        // If selectedProfile is set, update the existing profile
        await axios.put(`https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/profile/${selectedProfile._id}`, profile);
        setProfiles((prevProfiles) =>
          prevProfiles.map((p) => (p._id === selectedProfile._id ? { ...p, ...profile } : p))
        );
        setSelectedProfile(null); // Reset selectedProfile after updating
      } else {
        // If selectedProfile is not set, add a new profile
        const response = await axios.post('https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/profile', profile);
        setProfiles([...profiles, response.data]);
      }

      setNewProfile({ username: '', email: '', age: '' });
    } catch (error) {
      console.error('Error adding/updating user profile:', error.message);
    }
  };

  const removeUserProfile = async (profileId) => {
    try {
      if (!profileId) {
        console.error('Invalid profileId:', profileId);
        return;
      }

      await axios.delete(`https://smartpackbackend-aa75b80dcbbf.herokuapp.com/api/profile/${profileId}`);
      setProfiles(profiles.filter((profile) => profile._id !== profileId));
      setSelectedProfile(null); // Reset selectedProfile after removal
    } catch (error) {
      console.error('Error removing user profile:', error.message);
    }
  };

  const editUserProfile = (profile) => {
    setNewProfile(profile);
    setSelectedProfile(profile);
  };

  return (
    <div className="user-profiles-tab">
      <div className="panel">
        <div className="panel-heading">User Profiles</div>
        <div className="panel-content">
          {/* Render the list of user profiles */}
          {profiles.length > 0 ? (
            <ul>
              {profiles.map((profile) => (
                <li key={profile._id} className="profile-box">
                  <div>
                    <strong>Name: {profile.username} </strong>
                  
                  <div>
                    <strong>Email: {profile.email} </strong>
                  
                  <div>
                    <strong>Age: {profile.age} </strong>
                  
                  
                  <button
                    onClick={() => {
                      console.log("Removing user profile with ID:", profile._id);
                      removeUserProfile(profile._id);
                    }}
                  >
                    Remove
                  </button><br></br>
                  </div></div></div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No user profiles yet.</p>
          )}

          {/* Add or edit user profile form */}
          <div className="panel-heading">{ 'Add New User Profile'}</div>
          <label>
            Username:
            <input
              type="text"
              value={newProfile.username}
              onChange={(e) => setNewProfile({ ...newProfile, username: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={newProfile.email}
              onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              value={newProfile.age}
              onChange={(e) => setNewProfile({ ...newProfile, age: e.target.value })}
            />
          </label>
          <button onClick={() => addUserProfile(newProfile)}>
            {selectedProfile ? 'Update Profile' : 'Add User Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;

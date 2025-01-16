import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (err) {
        setError('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/profile', { username, email }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (err) {
      setError('Error updating profile');
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Update Profile</button>
        </form>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

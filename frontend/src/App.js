import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/deals');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to Ludex! Discover the best deals on video games.
          </p>
          <button onClick={() => window.location.reload()}>Fetch Data</button>
          {data ? (
            <ul>
              {data.map((deal) => (
                <li key={deal.dealID}>
                  {deal.title} - {deal.salePrice} (was {deal.normalPrice})
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading data...</p>
          )}
        </header>
        <Routes>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

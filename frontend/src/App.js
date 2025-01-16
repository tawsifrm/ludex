import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.cheapshark.com/api/1.0/deals');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
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
    </div>
  );
}

export default App;

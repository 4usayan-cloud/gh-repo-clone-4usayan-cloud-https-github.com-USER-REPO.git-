// Enhanced Data Fetcher with loading states, error handling, and more features
import { useState, useEffect } from 'react';

function DataFetcherEnhanced() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated API endpoint - replace with real API
    const mockApiEndpoint = '/api/data';
    
    setLoading(true);
    setError(null);
    
    fetch(mockApiEndpoint)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error">
        <h3>Error loading data</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="empty">
        <p>No data available</p>
      </div>
    );
  }

  // Success state - render data
  return (
    <div className="data-list">
      <h2>Fetched Data ({data.length} items)</h2>
      {data.map(item => (
        <div key={item.id} className="data-item">
          <h3>{item.name}</h3>
          {item.description && <p>{item.description}</p>}
        </div>
      ))}
    </div>
  );
}

export default DataFetcherEnhanced;

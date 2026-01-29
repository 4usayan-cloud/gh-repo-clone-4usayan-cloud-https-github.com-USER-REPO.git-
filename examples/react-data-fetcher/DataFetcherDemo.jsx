// Data Fetcher with Mock Data for Demo
import { useState, useEffect } from 'react';

// Mock API simulation
const mockApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Item 1', description: 'First item from API' },
        { id: 2, name: 'Item 2', description: 'Second item from API' },
        { id: 3, name: 'Item 3', description: 'Third item from API' },
        { id: 4, name: 'Item 4', description: 'Fourth item from API' },
      ]);
    }, 1000); // Simulate network delay
  });
};

function DataFetcherDemo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Using mock API for demonstration
    mockApiCall()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div className="spinner" style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #667eea',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }}></div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: '#fee',
        border: '1px solid #fcc',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0'
      }}>
        <h3 style={{ color: '#c00' }}>Error loading data</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Fetched Data ({data.length} items)</h2>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {data.map(item => (
          <div key={item.id} style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{item.name}</h3>
            <p style={{ margin: 0, color: '#666' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataFetcherDemo;

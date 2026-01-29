// Example using fetch API - Enhanced version with mock data

// Mock data generator for demonstration purposes
function generateMockData() {
  return {
    metric1: Math.floor(Math.random() * 1000) + 500,
    metric2: '$' + (Math.random() * 50000 + 10000).toFixed(2),
    metric3: Math.random() > 0.8 ? 'Warning' : 'Healthy',
    metric4: (Math.random() * 200 + 50).toFixed(0) + 'ms',
    timestamp: new Date().toISOString()
  };
}

// Main fetch function (original code from problem statement)
async function fetchDashboardData() {
  const statusIndicator = document.getElementById('status-indicator');
  
  try {
    // Show loading state
    statusIndicator.className = 'status-loading';
    
    // In production, use actual API endpoint:
    // const response = await fetch('https://api.example.com/dashboard-data');
    // const data = await response.json();
    
    // For this example, we'll simulate an API call with mock data
    const response = await simulateAPICall();
    const data = await response.json();
    
    updateDashboard(data);
    updateLastUpdateTime();
    
    // Show success state
    statusIndicator.className = 'status-success';
    
  } catch (error) {
    console.error('Error fetching data:', error);
    showErrorState();
    statusIndicator.className = 'status-error';
  }
}

// Simulate API call (for demonstration)
function simulateAPICall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        json: async () => generateMockData()
      });
    }, 500); // Simulate network delay
  });
}

function updateDashboard(data) {
  // Update your dashboard elements with new data
  document.getElementById('metric1').textContent = data.metric1;
  document.getElementById('metric2').textContent = data.metric2;
  document.getElementById('metric3').textContent = data.metric3;
  document.getElementById('metric4').textContent = data.metric4;
}

function updateLastUpdateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('last-update').textContent = `Last updated: ${timeString}`;
}

function showErrorState() {
  document.getElementById('metric1').textContent = 'Error';
  document.getElementById('metric2').textContent = 'Error';
  document.getElementById('metric3').textContent = 'Error';
  document.getElementById('metric4').textContent = 'Error';
}

// Refresh data every 30 seconds
setInterval(fetchDashboardData, 30000);

// Initial load
fetchDashboardData();

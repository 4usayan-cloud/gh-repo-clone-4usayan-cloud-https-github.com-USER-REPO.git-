// Simple example using fetch API (from problem statement)
async function fetchDashboardData() {
  try {
    const response = await fetch('https://api.example.com/dashboard-data');
    const data = await response.json();
    updateDashboard(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function updateDashboard(data) {
  // Update your dashboard elements with new data
  document.getElementById('metric1').textContent = data.metric1;
  document.getElementById('metric2').textContent = data.metric2;
  // ... etc
}

// Refresh data every 30 seconds
setInterval(fetchDashboardData, 30000);
fetchDashboardData(); // Initial load

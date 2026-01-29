// Netlify Function: Dashboard Data API
// Returns real-time dashboard metrics

// Generate random metrics for demonstration
function generateMetrics() {
  return {
    activeUsers: Math.floor(Math.random() * 500) + 100,
    totalSales: Math.floor(Math.random() * 50000) + 10000,
    serverStatus: Math.random() > 0.1 ? 'Operational' : 'Degraded',
    responseTime: Math.floor(Math.random() * 200) + 50,
    orders: Math.floor(Math.random() * 100) + 20,
    conversionRate: (Math.random() * 5 + 2).toFixed(2) + '%',
    timestamp: new Date().toISOString(),
    metric1: Math.floor(Math.random() * 1000),
    metric2: Math.floor(Math.random() * 1000),
    metric3: Math.floor(Math.random() * 1000),
    metric4: Math.floor(Math.random() * 1000)
  };
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Generate fresh metrics
    const metrics = generateMetrics();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: metrics,
        generatedAt: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error generating dashboard data:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to generate dashboard data'
      })
    };
  }
};

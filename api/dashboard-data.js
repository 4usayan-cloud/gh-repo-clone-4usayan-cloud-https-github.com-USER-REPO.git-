// Vercel Serverless Function - Dashboard Data API
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate random dashboard metrics
    const data = {
      metric1: Math.floor(Math.random() * 1000) + 500,
      metric2: Math.floor(Math.random() * 5000) + 1000,
      metric3: Math.floor(Math.random() * 100) + 50,
      metric4: Math.floor(Math.random() * 300) + 100,
      activeUsers: Math.floor(Math.random() * 500) + 100,
      totalSales: `$${(Math.random() * 50000 + 10000).toFixed(2)}`,
      serverStatus: Math.random() > 0.1 ? 'Healthy' : 'Warning',
      responseTime: `${(Math.random() * 200 + 50).toFixed(0)}ms`,
      timestamp: new Date().toISOString()
    };

    return res.status(200).json(data);

  } catch (error) {
    console.error('Dashboard data error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate dashboard data'
    });
  }
};

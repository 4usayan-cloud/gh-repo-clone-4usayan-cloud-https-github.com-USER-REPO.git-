// Vercel Serverless Function - Generic Data API
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get query parameter for data type
    const { type = 'users' } = req.query;

    let data;

    switch (type) {
      case 'users':
        data = [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
          { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager' },
          { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' }
        ];
        break;

      case 'products':
        data = [
          { id: 1, name: 'Product A', price: 29.99, stock: 150 },
          { id: 2, name: 'Product B', price: 49.99, stock: 75 },
          { id: 3, name: 'Product C', price: 19.99, stock: 200 },
          { id: 4, name: 'Product D', price: 99.99, stock: 25 },
          { id: 5, name: 'Product E', price: 39.99, stock: 100 }
        ];
        break;

      case 'tasks':
        data = [
          { id: 1, title: 'Complete project', status: 'In Progress', priority: 'High' },
          { id: 2, title: 'Review code', status: 'Pending', priority: 'Medium' },
          { id: 3, title: 'Update documentation', status: 'Completed', priority: 'Low' },
          { id: 4, title: 'Fix bugs', status: 'In Progress', priority: 'High' },
          { id: 5, title: 'Deploy to production', status: 'Pending', priority: 'Critical' }
        ];
        break;

      default:
        return res.status(400).json({
          error: 'Invalid data type',
          validTypes: ['users', 'products', 'tasks']
        });
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return res.status(200).json({
      type,
      count: data.length,
      data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Data API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch data'
    });
  }
};

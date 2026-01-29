// Netlify Function: Generic Data API
// Returns sample data for data fetcher examples

// Sample data collections
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Developer' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'QA Engineer' }
];

const products = [
  { id: 1, name: 'Laptop Pro', price: 1299, stock: 45, category: 'Electronics' },
  { id: 2, name: 'Wireless Mouse', price: 29, stock: 150, category: 'Accessories' },
  { id: 3, name: 'Mechanical Keyboard', price: 89, stock: 75, category: 'Accessories' },
  { id: 4, name: '4K Monitor', price: 399, stock: 30, category: 'Electronics' },
  { id: 5, name: 'USB-C Hub', price: 49, stock: 100, category: 'Accessories' }
];

const tasks = [
  { id: 1, title: 'Update documentation', status: 'completed', priority: 'high' },
  { id: 2, title: 'Fix login bug', status: 'in-progress', priority: 'critical' },
  { id: 3, title: 'Design new homepage', status: 'pending', priority: 'medium' },
  { id: 4, title: 'Implement search feature', status: 'in-progress', priority: 'high' },
  { id: 5, title: 'Write unit tests', status: 'pending', priority: 'medium' }
];

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
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
    // Get query parameters
    const params = event.queryStringParameters || {};
    const type = params.type || 'users';

    let data;
    switch (type) {
      case 'users':
        data = users;
        break;
      case 'products':
        data = products;
        break;
      case 'tasks':
        data = tasks;
        break;
      case 'all':
        data = { users, products, tasks };
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid type parameter',
            validTypes: ['users', 'products', 'tasks', 'all']
          })
        };
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        type: type,
        data: data,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error fetching data:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to fetch data'
      })
    };
  }
};

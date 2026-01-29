// Enhanced Netlify function using lowdb for better JSON database management
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

// Initialize lowdb
const dbPath = path.join(__dirname, 'data.json');
const adapter = new JSONFile(dbPath);
const defaultData = { items: [], lastUpdated: null };
const db = new Low(adapter, defaultData);

exports.handler = async (event) => {
  try {
    // Read data from JSON file
    await db.read();

    if (event.httpMethod === 'GET') {
      // Return all data
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(db.data)
      };
    }

    if (event.httpMethod === 'POST') {
      // Parse incoming data
      const newData = JSON.parse(event.body);
      
      // Validate data structure
      if (!newData.items || !Array.isArray(newData.items)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid data format. Expected { items: [] }' })
        };
      }

      // Update database
      db.data = {
        items: newData.items,
        lastUpdated: new Date().toISOString()
      };

      // Write to file
      await db.write();

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Updated successfully', data: db.data })
      };
    }

    // Method not allowed
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};

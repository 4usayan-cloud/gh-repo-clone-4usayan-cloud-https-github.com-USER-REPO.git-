// In your Netlify function (e.g. /functions/db.js)
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const dbPath = path.join(__dirname, 'data.json');
  
  if (event.httpMethod === 'GET') {
    const data = JSON.parse(fs.readFileSync(dbPath));
    return { statusCode: 200, body: JSON.stringify(data) };
  }
  
  if (event.httpMethod === 'POST') {
    fs.writeFileSync(dbPath, event.body);
    return { statusCode: 200, body: 'Updated' };
  }
};

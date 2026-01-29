# Netlify Serverless Database Function

A simple JSON-based database using Netlify serverless functions. This example demonstrates how to create a serverless API that reads and writes to a JSON file.

## Overview

This example implements a serverless function that acts as a simple database API, using file system operations to persist data in a JSON file. It's perfect for small applications, prototypes, or static sites that need lightweight data persistence without a traditional database.

## Files

- **functions/db.js** - Basic serverless function handling GET/POST requests (vanilla Node.js)
- **functions/db-lowdb.js** - Enhanced version using lowdb library
- **functions/data.json** - JSON file serving as the database
- **netlify.toml** - Netlify configuration
- **index.html** - Demo client for testing the API
- **package.json** - Dependencies including lowdb
- **README.md** - This documentation

## Core Implementation (from problem statement)

```javascript
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
```

## Enhanced Version with lowdb

For better JSON database management, we also provide an enhanced version using [lowdb](https://github.com/typicode/lowdb):

```javascript
// functions/db-lowdb.js
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
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(db.data)
      };
    }

    if (event.httpMethod === 'POST') {
      const newData = JSON.parse(event.body);
      
      // Validate data structure
      if (!newData.items || !Array.isArray(newData.items)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid data format' })
        };
      }

      // Update and write
      db.data = {
        items: newData.items,
        lastUpdated: new Date().toISOString()
      };
      await db.write();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Updated successfully' })
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

**Benefits of using lowdb:**
- ✅ Async/await API (non-blocking)
- ✅ Built-in error handling
- ✅ Better data validation
- ✅ Cleaner, more maintainable code
- ✅ Automatic JSON formatting

**Installation:**
```bash
npm install lowdb
```

## Features

- ✅ **GET Requests** - Read data from JSON file
- ✅ **POST Requests** - Write data to JSON file
- ✅ **File System Operations** - Uses Node.js fs module
- ✅ **No Database Required** - Simple JSON file persistence
- ✅ **Serverless** - Runs on Netlify Functions (AWS Lambda)
- ✅ **Easy Deployment** - One-click deploy to Netlify

## Quick Start

### Option 1: Local Testing (Demo)

Simply open `index.html` in your browser:

```bash
open index.html
# or
xdg-open index.html  # Linux
start index.html     # Windows
```

The demo uses mock data and simulates the serverless function behavior.

### Option 2: Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

4. **Access your function:**
   ```
   https://your-site.netlify.app/.netlify/functions/db
   ```

## How It Works

### 1. File Structure

```
examples/netlify-serverless-db/
├── functions/
│   ├── db.js          # Serverless function
│   └── data.json      # JSON database
├── netlify.toml       # Netlify config
├── index.html         # Demo client
└── README.md
```

### 2. GET Request - Read Data

```javascript
if (event.httpMethod === 'GET') {
  const data = JSON.parse(fs.readFileSync(dbPath));
  return { statusCode: 200, body: JSON.stringify(data) };
}
```

**How it works:**
1. Checks if request method is GET
2. Reads `data.json` from file system
3. Parses JSON content
4. Returns data with 200 status

**Client-side usage:**
```javascript
const response = await fetch('/.netlify/functions/db');
const data = await response.json();
console.log(data);
```

### 3. POST Request - Write Data

```javascript
if (event.httpMethod === 'POST') {
  fs.writeFileSync(dbPath, event.body);
  return { statusCode: 200, body: 'Updated' };
}
```

**How it works:**
1. Checks if request method is POST
2. Writes request body directly to `data.json`
3. Returns success message with 200 status

**Client-side usage:**
```javascript
const newData = { items: [...], lastUpdated: new Date() };
const response = await fetch('/.netlify/functions/db', {
  method: 'POST',
  body: JSON.stringify(newData)
});
```

## Configuration

### netlify.toml

```toml
[build]
  functions = "functions"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

**Configuration explained:**
- `functions = "functions"` - Tells Netlify where to find serverless functions
- `redirects` - Maps `/api/db` to `/.netlify/functions/db` for cleaner URLs

## Usage Examples

### Example 1: Fetch All Data

```javascript
async function fetchData() {
  try {
    const response = await fetch('/.netlify/functions/db');
    const data = await response.json();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Example 2: Update Data

```javascript
async function updateData(newData) {
  try {
    const response = await fetch('/.netlify/functions/db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    });
    
    if (response.ok) {
      console.log('Data updated successfully');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Usage
updateData({
  items: [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ],
  lastUpdated: new Date().toISOString()
});
```

### Example 3: Add Item to List

```javascript
async function addItem(newItem) {
  // First, fetch current data
  const response = await fetch('/.netlify/functions/db');
  const currentData = await response.json();
  
  // Add new item
  currentData.items.push(newItem);
  currentData.lastUpdated = new Date().toISOString();
  
  // Save updated data
  await fetch('/.netlify/functions/db', {
    method: 'POST',
    body: JSON.stringify(currentData)
  });
}
```

## Enhanced Version

For production use, consider these improvements:

### 1. Error Handling

```javascript
exports.handler = async (event) => {
  const dbPath = path.join(__dirname, 'data.json');
  
  try {
    if (event.httpMethod === 'GET') {
      if (!fs.existsSync(dbPath)) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Database not found' })
        };
      }
      
      const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
    }
    
    if (event.httpMethod === 'POST') {
      const newData = JSON.parse(event.body);
      fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2), 'utf8');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Updated successfully' })
      };
    }
    
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

### 2. CORS Headers

```javascript
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }
  
  // ... rest of function
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(data)
  };
};
```

### 3. Validation

```javascript
if (event.httpMethod === 'POST') {
  try {
    const newData = JSON.parse(event.body);
    
    // Validate data structure
    if (!newData.items || !Array.isArray(newData.items)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid data format' })
      };
    }
    
    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2));
    return { statusCode: 200, body: 'Updated' };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }
}
```

## Limitations

### Important Considerations

1. **Not for Production at Scale** - This approach works for small datasets and low traffic
2. **File System Persistence** - Data persists only on the function instance
3. **Concurrent Writes** - No locking mechanism for simultaneous writes
4. **Read-Heavy** - Better suited for read operations than frequent writes
5. **Size Limits** - AWS Lambda has file system size limitations

### When to Use

✅ **Good for:**
- Prototypes and demos
- Small configuration files
- Infrequently updated data
- Static site generators needing simple persistence
- Low-traffic applications

❌ **Not recommended for:**
- High-traffic applications
- Frequent concurrent writes
- Large datasets (> 1MB)
- Applications requiring transactions
- Production e-commerce

## Alternatives

For production applications, consider:

1. **FaunaDB** - Serverless database designed for JAMstack
2. **MongoDB Atlas** - Cloud MongoDB with free tier
3. **PostgreSQL (Supabase)** - Open-source Firebase alternative
4. **DynamoDB** - AWS NoSQL database
5. **Airtable** - Spreadsheet-like database with API

## Testing Locally

### Using Netlify Dev

```bash
# Install dependencies
npm install netlify-cli -g

# Start local development server
netlify dev

# Your function will be available at:
# http://localhost:8888/.netlify/functions/db
```

### Manual Testing

```bash
# Test GET request
curl http://localhost:8888/.netlify/functions/db

# Test POST request
curl -X POST http://localhost:8888/.netlify/functions/db \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":1,"name":"Test"}]}'
```

## Deployment

### Deploy to Netlify

1. **Connect repository:**
   - Go to Netlify dashboard
   - Click "Add new site"
   - Connect your Git repository

2. **Configure build settings:**
   ```
   Base directory: examples/netlify-serverless-db
   Functions directory: functions
   ```

3. **Deploy:**
   - Netlify automatically deploys when you push to your repository

### Environment Variables

If you need environment variables:

```javascript
exports.handler = async (event) => {
  const apiKey = process.env.API_KEY;
  // Use environment variable
};
```

Set in Netlify dashboard:
- Site settings → Environment variables

## Security Considerations

⚠️ **Important:**

1. **No Authentication** - This basic example has no auth
2. **Public Access** - Anyone can read/write to your function
3. **Input Validation** - Always validate and sanitize input
4. **Rate Limiting** - Consider adding rate limiting

### Adding Basic Authentication

```javascript
exports.handler = async (event) => {
  const authHeader = event.headers.authorization;
  const expectedToken = process.env.API_TOKEN;
  
  if (authHeader !== `Bearer ${expectedToken}`) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }
  
  // ... rest of function
};
```

## Troubleshooting

### Function not found

**Issue:** 404 error when accessing function

**Solutions:**
1. Check `netlify.toml` configuration
2. Verify function is in `functions/` directory
3. Ensure function exports `handler`
4. Check Netlify deploy logs

### Data not persisting

**Issue:** Data resets after function execution

**Cause:** Serverless functions are stateless. Each invocation may use a different instance.

**Solution:** For persistent data, use a real database service.

### File not found error

**Issue:** `ENOENT: no such file or directory`

**Solutions:**
1. Ensure `data.json` exists in same directory as function
2. Check file permissions
3. Verify path construction with `__dirname`

## Further Reading

- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [AWS Lambda Node.js Runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-nodejs.html)
- [JAMstack Best Practices](https://jamstack.org/best-practices/)
- [Serverless Framework](https://www.serverless.com/)

## License

This example is provided for educational purposes. Feel free to use and modify for your projects.

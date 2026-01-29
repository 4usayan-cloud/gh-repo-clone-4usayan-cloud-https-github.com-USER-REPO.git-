# Real-time Dashboard Example

This example demonstrates how to create a real-time dashboard that fetches and displays data using the JavaScript Fetch API.

## Features

- ✅ Asynchronous data fetching with `async/await`
- ✅ Auto-refresh every 30 seconds using `setInterval`
- ✅ Error handling and status indicators
- ✅ Responsive design
- ✅ Visual feedback for loading, success, and error states

## Files

- **index.html** - Dashboard HTML structure
- **dashboard.js** - Complete implementation with mock data
- **dashboard-simple.js** - Simple version (from code specification)
- **dashboard.css** - Styling and animations

## Code Overview

### Basic Implementation

```javascript
// Example using fetch API
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
```

## Usage

### Option 1: Open directly in browser

Simply open `index.html` in your web browser. The dashboard will start fetching data automatically.

### Option 2: Use a local server

For better development experience, use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to: `http://localhost:8000/index.html`

## Customization

### Connecting to Your API

To connect to your own API, modify the `fetchDashboardData()` function in `dashboard.js`:

```javascript
async function fetchDashboardData() {
  try {
    // Replace with your API endpoint
    const response = await fetch('https://your-api.com/dashboard-data');
    const data = await response.json();
    updateDashboard(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
```

### Expected API Response Format

Your API should return JSON data in this format:

```json
{
  "metric1": 1234,
  "metric2": "$45,678.90",
  "metric3": "Healthy",
  "metric4": "125ms",
  "timestamp": "2024-01-29T08:00:00Z"
}
```

### Adjusting Refresh Interval

To change the auto-refresh interval, modify the `setInterval` value:

```javascript
// Refresh every 10 seconds
setInterval(fetchDashboardData, 10000);

// Refresh every 1 minute
setInterval(fetchDashboardData, 60000);

// Refresh every 5 minutes
setInterval(fetchDashboardData, 300000);
```

### Adding More Metrics

To add more dashboard cards:

1. Add HTML in `index.html`:
```html
<div class="card">
    <h2>New Metric</h2>
    <div class="metric" id="metric5">Loading...</div>
    <p class="description">Description here</p>
</div>
```

2. Update JavaScript in `dashboard.js`:
```javascript
function updateDashboard(data) {
  document.getElementById('metric1').textContent = data.metric1;
  document.getElementById('metric2').textContent = data.metric2;
  document.getElementById('metric3').textContent = data.metric3;
  document.getElementById('metric4').textContent = data.metric4;
  document.getElementById('metric5').textContent = data.metric5; // New metric
}
```

## Error Handling

The dashboard includes comprehensive error handling:

- **Network Errors**: Displays "Error" in metrics when API is unreachable
- **Console Logging**: Errors are logged for debugging
- **Visual Indicators**: Status indicator changes color (orange=loading, green=success, red=error)
- **Graceful Degradation**: Previous data remains visible during errors

## Browser Compatibility

This example uses modern JavaScript features:
- `async/await` (ES2017)
- `fetch API` (ES2015)
- Arrow functions (ES2015)

**Supported Browsers:**
- Chrome 55+
- Firefox 52+
- Safari 10.1+
- Edge 14+

For older browser support, consider using [Babel](https://babeljs.io/) to transpile the code.

## Best Practices Demonstrated

1. **Async/Await**: Clean asynchronous code handling
2. **Error Handling**: Try-catch blocks for robust error management
3. **Separation of Concerns**: Separate functions for fetching and updating
4. **User Feedback**: Visual indicators for loading and error states
5. **Responsive Design**: Works on desktop and mobile devices
6. **Performance**: Efficient DOM updates only when needed

## Common Issues

### CORS Errors

If you see CORS errors in the console, your API needs to include CORS headers:

```
Access-Control-Allow-Origin: *
```

Or use a CORS proxy for testing:
```javascript
const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.example.com/data');
```

### Mixed Content Warnings

If your page is served over HTTPS but your API is HTTP, browsers will block the request. Solutions:
- Serve your API over HTTPS
- Use a relative URL if API is on same domain
- Configure your server for HTTPS

## Learning Resources

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [JavaScript.info: Fetch](https://javascript.info/fetch)

## License

This example is provided as-is for educational purposes. Feel free to use and modify it in your projects.

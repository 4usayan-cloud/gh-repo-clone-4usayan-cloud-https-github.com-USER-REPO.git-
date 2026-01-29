// Netlify Function: Contact Form API
// Handles POST requests from contact forms

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields',
          required: ['name', 'email', 'message']
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Log the submission (in production, you'd save to database or send email)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      message: data.message.substring(0, 50) + '...',
      timestamp: new Date().toISOString()
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
        submittedAt: new Date().toISOString(),
        data: {
          name: data.name,
          email: data.email
        }
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process your submission. Please try again.'
      })
    };
  }
};

# React Contact Form with Validation

A complete React contact form component with validation, error handling, and async submission using the Fetch API.

## Features

- ✅ **Form Validation** - Client-side validation for name, email, and message
- ✅ **Real-time Feedback** - Errors clear as user types
- ✅ **Async Submission** - Uses Fetch API with proper error handling
- ✅ **Loading States** - Visual feedback during form submission
- ✅ **Success/Error Messages** - User-friendly alerts
- ✅ **Responsive Design** - Works on all screen sizes
- ✅ **Accessible** - Proper labels and ARIA attributes

## Files

- **ContactForm.jsx** - Complete form component with validation
- **ContactFormSimple.jsx** - Minimal version matching the original spec
- **ContactForm.css** - Styling for the form
- **demo.html** - Static HTML demo page
- **README.md** - This documentation

## Installation

### Using in a React Project

1. **Copy the component files to your project:**
   ```bash
   cp ContactForm.jsx your-project/src/components/
   cp ContactForm.css your-project/src/components/
   ```

2. **Import and use the component:**
   ```jsx
   import ContactForm from './components/ContactForm';
   import './components/ContactForm.css';
   
   function App() {
     return (
       <div>
         <ContactForm />
       </div>
     );
   }
   ```

### Prerequisites

- React 16.8+ (for hooks)
- A backend API endpoint at `/api/contact` (or modify the endpoint)

## Code Overview

### Basic Structure (from problem statement)

```jsx
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
    }
  };
  
  return (
    // Form JSX
  );
}
```

### Enhanced Version

The full implementation adds:

1. **Form state management**
   ```jsx
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     message: ''
   });
   ```

2. **Validation function**
   ```jsx
   const validateForm = (data) => {
     const newErrors = {};
     
     if (!data.name || data.name.trim().length < 2) {
       newErrors.name = 'Name must be at least 2 characters';
     }
     
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!data.email || !emailRegex.test(data.email)) {
       newErrors.email = 'Please enter a valid email address';
     }
     
     if (!data.message || data.message.trim().length < 10) {
       newErrors.message = 'Message must be at least 10 characters';
     }
     
     return newErrors;
   };
   ```

3. **Complete JSX with proper form fields**

## API Integration

### Expected API Endpoint

Your backend should accept POST requests at `/api/contact` with this structure:

```javascript
// Request
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, this is my message..."
}

// Success Response
200 OK
{
  "success": true,
  "message": "Message received"
}

// Error Response
400 Bad Request or 500 Internal Server Error
{
  "error": "Error message"
}
```

### Modifying the API Endpoint

To change the API endpoint, modify the fetch call in `handleSubmit`:

```jsx
const response = await fetch('https://your-api.com/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

## Customization

### Validation Rules

Modify the `validateForm` function to adjust validation:

```jsx
const validateForm = (data) => {
  const newErrors = {};
  
  // Adjust minimum name length
  if (!data.name || data.name.trim().length < 3) {
    newErrors.name = 'Name must be at least 3 characters';
  }
  
  // Add phone number validation
  if (data.phone && !/^\d{10}$/.test(data.phone)) {
    newErrors.phone = 'Phone must be 10 digits';
  }
  
  return newErrors;
};
```

### Adding More Fields

1. **Update state:**
   ```jsx
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     phone: '',    // New field
     message: ''
   });
   ```

2. **Add JSX:**
   ```jsx
   <div className="form-group">
     <label htmlFor="phone">Phone</label>
     <input
       type="tel"
       id="phone"
       name="phone"
       value={formData.phone}
       onChange={handleChange}
       placeholder="1234567890"
     />
   </div>
   ```

### Styling

The form uses CSS custom properties. Modify colors in `ContactForm.css`:

```css
.submit-button {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

.form-group input:focus {
  border-color: #your-accent-color;
}
```

## Examples

### Basic Usage

```jsx
import ContactForm from './ContactForm';
import './ContactForm.css';

function ContactPage() {
  return (
    <div className="page">
      <h1>Get in Touch</h1>
      <ContactForm />
    </div>
  );
}
```

### With Custom Success Handler

```jsx
import { useState } from 'react';
import ContactForm from './ContactForm';

function ContactPage() {
  const handleSuccess = () => {
    console.log('Form submitted successfully!');
    // Redirect or show custom message
  };
  
  return <ContactForm onSuccess={handleSuccess} />;
}
```

## Troubleshooting

### CORS Errors

If you see CORS errors, ensure your backend includes proper headers:

```javascript
// Express.js example
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
```

### Form Not Submitting

1. Check browser console for errors
2. Verify the API endpoint is correct
3. Ensure backend is running
4. Check network tab for the request/response

### Validation Not Working

1. Ensure all required fields have the `required` attribute
2. Check that field names match the validation function
3. Verify `handleChange` is properly updating state

## Testing

### Manual Testing Checklist

- [ ] Empty form submission shows validation errors
- [ ] Invalid email shows error message
- [ ] Short name (< 2 chars) shows error
- [ ] Short message (< 10 chars) shows error
- [ ] Successful submission shows success message
- [ ] Failed submission shows error message
- [ ] Form resets after successful submission
- [ ] Submit button disables during submission
- [ ] Errors clear when typing in fields

### Unit Testing Example

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactForm from './ContactForm';

test('validates required fields', async () => {
  render(<ContactForm />);
  
  const submitButton = screen.getByRole('button', { name: /send message/i });
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
  });
});
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Requires support for:
- ES6+ (async/await, arrow functions)
- Fetch API
- React Hooks

## Best Practices Demonstrated

1. **Controlled Components** - Form state managed by React
2. **Validation** - Client-side validation before submission
3. **Error Handling** - Try-catch blocks and user feedback
4. **Loading States** - Disabled inputs during submission
5. **Accessibility** - Proper labels and semantic HTML
6. **User Experience** - Real-time error clearing
7. **Code Organization** - Separated concerns (validation, handlers, JSX)

## Security Considerations

1. **Never trust client-side validation alone** - Always validate on the server
2. **Sanitize input** - Prevent XSS attacks on your backend
3. **Rate limiting** - Implement on your API to prevent abuse
4. **HTTPS** - Always use HTTPS in production
5. **CSRF protection** - Implement CSRF tokens if needed

## License

This example is provided for educational purposes. Feel free to use and modify for your projects.

## Additional Resources

- [React Forms Documentation](https://react.dev/reference/react-dom/components/form)
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Form Validation - MDN](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
- [React Hooks Documentation](https://react.dev/reference/react)

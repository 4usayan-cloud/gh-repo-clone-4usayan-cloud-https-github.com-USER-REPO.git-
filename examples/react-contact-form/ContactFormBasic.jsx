// Example React form with validation
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
    <form onSubmit={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send'}
      </button>
      {status === 'success' && <div>Thank you!</div>}
    </form>
  );
}

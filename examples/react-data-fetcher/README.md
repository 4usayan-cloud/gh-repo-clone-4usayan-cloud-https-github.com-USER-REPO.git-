# React Data Fetcher

A React component example demonstrating data fetching using hooks (`useState` and `useEffect`). This pattern is fundamental for building React applications that consume APIs.

## Overview

This example implements the core React data fetching pattern from the new requirement, showing how to:
- Fetch data from an API endpoint
- Manage loading, error, and success states
- Render fetched data dynamically

## Files

- **DataFetcher.jsx** - Basic implementation (from requirement)
- **DataFetcherEnhanced.jsx** - Enhanced version with error handling
- **DataFetcherDemo.jsx** - Demo version with mock data
- **demo.html** - Standalone demo (no build needed!)
- **README.md** - This documentation

## Core Implementation (from requirement)

```jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Features

- ✅ **useState Hook** - Manage component state
- ✅ **useEffect Hook** - Handle side effects (data fetching)
- ✅ **Loading States** - Show loading indicator while fetching
- ✅ **Error Handling** - Graceful error display
- ✅ **Empty States** - Handle no data scenarios
- ✅ **Dynamic Rendering** - Render list from fetched data
- ✅ **Mock API** - Demo works without backend

## Quick Start

### Option 1: View Demo (No Setup Required)

Simply open `demo.html` in your browser:

```bash
open demo.html
# or
xdg-open demo.html  # Linux
start demo.html     # Windows
```

The demo uses React from CDN and includes mock data.

### Option 2: Use in React App

1. **Copy component to your project:**
   ```bash
   cp DataFetcher.jsx your-react-app/src/components/
   ```

2. **Import and use:**
   ```jsx
   import DataFetcher from './components/DataFetcher';
   
   function App() {
     return (
       <div>
         <DataFetcher />
       </div>
     );
   }
   ```

## Code Walkthrough

### 1. Import Hooks

```jsx
import { useState, useEffect } from 'react';
```

- `useState`: For managing component state
- `useEffect`: For side effects (API calls, subscriptions, etc.)

### 2. State Management

```jsx
const [data, setData] = useState([]);
```

- `data`: Current state value (initially empty array)
- `setData`: Function to update state
- `[]`: Initial state value

### 3. Data Fetching with useEffect

```jsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []);
```

**How it works:**
- Runs after component mounts (because of empty dependency array `[]`)
- Fetches data from API endpoint
- Parses JSON response
- Updates state with `setData`

**Dependency Array `[]`:**
- Empty array = run once on mount
- `[dep]` = run when `dep` changes
- No array = run on every render

### 4. Rendering Data

```jsx
return (
  <div>
    {data.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
);
```

- `map()` transforms array to JSX elements
- `key` prop required for list items (helps React track changes)
- Renders each item's name

## Enhanced Version

### With Loading and Error States

```jsx
function DataFetcherEnhanced() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Common Patterns

### Pattern 1: Async/Await Syntax

```jsx
useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    } catch (error) {
      setError(error.message);
    }
  }
  
  fetchData();
}, []);
```

### Pattern 2: Abort Controller (Cleanup)

```jsx
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    });
  
  // Cleanup function
  return () => controller.abort();
}, []);
```

### Pattern 3: Fetch with Parameters

```jsx
function DataFetcher({ userId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/api/users/${userId}/data`)
      .then(res => res.json())
      .then(setData);
  }, [userId]); // Re-fetch when userId changes
  
  // ...
}
```

### Pattern 4: Post Request

```jsx
useEffect(() => {
  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter: 'active' })
  })
    .then(res => res.json())
    .then(setData);
}, []);
```

## Customization

### Adding More Data Fields

```jsx
// Render more fields
return (
  <div>
    {data.map(item => (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <span>${item.price}</span>
      </div>
    ))}
  </div>
);
```

### Adding Filtering

```jsx
function DataFetcher() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter..."
      />
      {filteredData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

### Refetching Data

```jsx
function DataFetcher() {
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, [refetch]); // Refetch when refetch changes

  return (
    <div>
      <button onClick={() => setRefetch(prev => prev + 1)}>
        Refresh
      </button>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Best Practices

### 1. Always Include Cleanup

```jsx
useEffect(() => {
  let cancelled = false;
  
  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {
        setData(data);
      }
    });
  
  return () => {
    cancelled = true;
  };
}, []);
```

### 2. Handle All States

```jsx
// Loading state
if (loading) return <Spinner />;

// Error state
if (error) return <Error message={error} />;

// Empty state
if (data.length === 0) return <EmptyState />;

// Success state
return <DataList data={data} />;
```

### 3. Use TypeScript

```tsx
interface Item {
  id: number;
  name: string;
}

function DataFetcher() {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // ...
}
```

### 4. Extract Fetching Logic

```jsx
// Custom hook
function useData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function DataFetcher() {
  const { data, loading, error } = useData('/api/data');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Common Issues

### Issue 1: Infinite Loop

```jsx
// ❌ Wrong - causes infinite loop
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}); // No dependency array!

// ✅ Correct
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData);
}, []); // Empty array = run once
```

### Issue 2: Memory Leak Warning

```
Warning: Can't perform a React state update on an unmounted component
```

**Solution:** Add cleanup:
```jsx
useEffect(() => {
  let isMounted = true;
  
  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      if (isMounted) {
        setData(data);
      }
    });
  
  return () => {
    isMounted = false;
  };
}, []);
```

### Issue 3: Missing Key Prop

```
Warning: Each child in a list should have a unique "key" prop
```

**Solution:** Always provide key:
```jsx
{data.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

## Testing

### Example Test with React Testing Library

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import DataFetcher from './DataFetcher';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ])
  })
);

test('renders fetched data', async () => {
  render(<DataFetcher />);
  
  await waitFor(() => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
```

## Integration with React Query

For production apps, consider using React Query:

```jsx
import { useQuery } from 'react-query';

function DataFetcher() {
  const { data, isLoading, error } = useQuery('data', () =>
    fetch('/api/data').then(res => res.json())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## Browser Compatibility

- React 18+
- Modern browsers with ES6+ support
- Fetch API support (or polyfill)

## Further Reading

- [React Hooks Documentation](https://react.dev/reference/react)
- [useEffect Hook](https://react.dev/reference/react/useEffect)
- [useState Hook](https://react.dev/reference/react/useState)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Query](https://tanstack.com/query/latest)

## License

This example is provided for educational purposes. Feel free to use and modify for your projects.

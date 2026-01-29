# Dynamic Data Renderer

A vanilla JavaScript example demonstrating how to render mock data dynamically in the DOM. This example showcases fundamental DOM manipulation techniques and interactive features.

## Overview

This example implements the core concept from the problem statement: rendering an array of objects dynamically to the page. It extends the basic functionality with interactive features like adding, deleting, filtering, and sorting items.

## Files

- **index.html** - HTML structure with data container
- **renderer.js** - JavaScript logic for rendering and interaction
- **styles.css** - Modern styling with animations
- **README.md** - This documentation

## Core Implementation (from problem statement)

```javascript
const mockData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// Render mock data dynamically
function renderData() {
  const container = document.getElementById('data-container');
  container.innerHTML = mockData.map(item => 
    `<div class="item">${item.name}</div>`
  ).join('');
}

renderData();
```

## Features

- ✅ **Dynamic Rendering** - Render data from JavaScript array to HTML
- ✅ **Add Items** - Add new items to the list dynamically
- ✅ **Delete Items** - Remove items from the list
- ✅ **Filter Items** - Search/filter items in real-time
- ✅ **Sort Items** - Toggle ascending/descending sort
- ✅ **Reset Data** - Restore original mock data
- ✅ **Item Counter** - Display total number of items
- ✅ **Responsive Design** - Works on desktop and mobile

## Usage

### Basic Usage

Simply open `index.html` in a web browser:

```bash
# Open in default browser
open index.html

# Or on Linux
xdg-open index.html

# Or on Windows
start index.html
```

The page will load with two initial items and interactive controls.

### Local Server (Recommended)

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

## Code Walkthrough

### 1. Mock Data Structure

```javascript
const mockData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];
```

Each item has:
- `id`: Unique identifier
- `name`: Display name

### 2. Core Rendering Function

```javascript
function renderData() {
  const container = document.getElementById('data-container');
  container.innerHTML = currentData.map(item => 
    `<div class="item">${item.name}</div>`
  ).join('');
}
```

**How it works:**
1. Get the container element by ID
2. Use `map()` to transform each data item into HTML
3. Use template literals for clean HTML string creation
4. `join('')` combines array into single string
5. Set as `innerHTML` to render

### 3. Adding Items

```javascript
function addItem() {
  const newItem = {
    id: nextId++,
    name: `Item ${nextId - 1}`
  };
  currentData.push(newItem);
  renderData();
}
```

### 4. Deleting Items

```javascript
function deleteItem(id) {
  currentData = currentData.filter(item => item.id !== id);
  renderData();
}
```

Uses `filter()` to create new array without the deleted item.

### 5. Filtering Items

```javascript
function filterItems(searchTerm) {
  if (!searchTerm) {
    currentData = [...originalData];
  } else {
    currentData = originalData.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  renderData();
}
```

### 6. Sorting Items

```javascript
function sortItems() {
  currentData.sort((a, b) => {
    if (sortAscending) {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  sortAscending = !sortAscending;
  renderData();
}
```

## Customization

### Changing Data Structure

You can modify the mock data to include more fields:

```javascript
const mockData = [
  { id: 1, name: "Item 1", description: "Description 1", price: 19.99 },
  { id: 2, name: "Item 2", description: "Description 2", price: 29.99 },
];
```

Then update the rendering template:

```javascript
function renderData() {
  const container = document.getElementById('data-container');
  container.innerHTML = currentData.map(item => 
    `<div class="item">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <span class="price">$${item.price}</span>
      <button onclick="deleteItem(${item.id})">Delete</button>
    </div>`
  ).join('');
}
```

### Adding Animation Effects

Modify the CSS for different animations:

```css
.item {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
```

### Loading Data from API

Replace mock data with API fetch:

```javascript
async function loadData() {
  try {
    const response = await fetch('https://api.example.com/items');
    const data = await response.json();
    currentData = data;
    renderData();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', loadData);
```

## Best Practices Demonstrated

1. **Separation of Concerns** - Data, logic, and presentation are separated
2. **Template Literals** - Clean, readable HTML generation
3. **Array Methods** - Using `map()`, `filter()`, `sort()` for data manipulation
4. **Event Delegation** - Efficient event handling
5. **Immutability** - Using spread operator `[...]` to avoid mutations
6. **Progressive Enhancement** - Starts with basic functionality, adds features

## Common Patterns

### Pattern 1: Basic List Rendering

```javascript
const items = ['Apple', 'Banana', 'Cherry'];
const container = document.getElementById('list');
container.innerHTML = items.map(item => 
  `<li>${item}</li>`
).join('');
```

### Pattern 2: Rendering with Index

```javascript
container.innerHTML = items.map((item, index) => 
  `<div>${index + 1}. ${item}</div>`
).join('');
```

### Pattern 3: Conditional Rendering

```javascript
container.innerHTML = items.map(item => 
  item.active ? `<div class="active">${item.name}</div>` : ''
).join('');
```

### Pattern 4: Nested Data

```javascript
const categories = [
  { name: 'Fruits', items: ['Apple', 'Banana'] },
  { name: 'Vegetables', items: ['Carrot', 'Broccoli'] }
];

container.innerHTML = categories.map(category => `
  <div class="category">
    <h3>${category.name}</h3>
    <ul>
      ${category.items.map(item => `<li>${item}</li>`).join('')}
    </ul>
  </div>
`).join('');
```

## Performance Considerations

### Use DocumentFragment for Large Lists

For rendering many items (100+), use DocumentFragment:

```javascript
function renderDataOptimized() {
  const container = document.getElementById('data-container');
  const fragment = document.createDocumentFragment();
  
  currentData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = item.name;
    fragment.appendChild(div);
  });
  
  container.innerHTML = '';
  container.appendChild(fragment);
}
```

### Virtual Scrolling

For very large lists (1000+), consider virtual scrolling libraries or implement windowing.

## Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

Requires support for:
- ES6 features (arrow functions, template literals, spread operator)
- Array methods (`map`, `filter`, `sort`)
- `addEventListener`

## Troubleshooting

### Items not rendering

**Issue:** Nothing appears on the page

**Solutions:**
1. Check browser console for errors
2. Verify the container element exists: `document.getElementById('data-container')`
3. Ensure script is loaded after HTML or use `DOMContentLoaded`
4. Check that `renderData()` is being called

### Incorrect HTML escaping

**Issue:** HTML is rendered as text

**Solution:** Make sure you're using `innerHTML`, not `textContent`:
```javascript
// Wrong
container.textContent = '<div>Item</div>';

// Correct
container.innerHTML = '<div>Item</div>';
```

### Events not working after re-render

**Issue:** Click handlers stop working after update

**Solution:** Use inline `onclick` or event delegation:
```javascript
// Option 1: Inline (used in this example)
`<button onclick="deleteItem(${item.id})">Delete</button>`

// Option 2: Event delegation
container.addEventListener('click', function(e) {
  if (e.target.matches('.delete-btn')) {
    const id = e.target.dataset.id;
    deleteItem(id);
  }
});
```

## Security Note

⚠️ **XSS Warning**: When using `innerHTML`, ensure data is sanitized if it comes from user input or external sources. For this example with controlled mock data, it's safe.

For user-generated content, sanitize HTML:

```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Use it
container.innerHTML = items.map(item => 
  `<div>${escapeHtml(item.name)}</div>`
).join('');
```

## Further Reading

- [MDN: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [MDN: Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- [DOM Manipulation Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

## License

This example is provided for educational purposes. Feel free to use and modify for your projects.

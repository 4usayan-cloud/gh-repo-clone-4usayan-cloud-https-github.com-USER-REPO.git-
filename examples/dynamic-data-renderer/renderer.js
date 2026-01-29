// Mock data (from problem statement)
const mockData = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// Store original data and working copy
let originalData = [...mockData];
let currentData = [...mockData];
let nextId = 3;

// Render mock data dynamically (from problem statement)
function renderData() {
  const container = document.getElementById('data-container');
  container.innerHTML = currentData.map(item => 
    `<div class="item" data-id="${item.id}">
      <span class="item-name">${item.name}</span>
      <button class="delete-btn" onclick="deleteItem(${item.id})">×</button>
    </div>`
  ).join('');
  
  updateStats();
}

// Update statistics
function updateStats() {
  document.getElementById('item-count').textContent = currentData.length;
}

// Add new item
function addItem() {
  const newItem = {
    id: nextId++,
    name: `Item ${nextId - 1}`
  };
  currentData.push(newItem);
  renderData();
}

// Delete item
function deleteItem(id) {
  currentData = currentData.filter(item => item.id !== id);
  renderData();
}

// Sort items by name
let sortAscending = true;
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

// Reset to original data
function resetData() {
  currentData = [...originalData];
  nextId = 3;
  renderData();
  document.getElementById('filter-input').value = '';
}

// Filter items
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

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Add item button
  document.getElementById('add-item-btn').addEventListener('click', addItem);
  
  // Sort button
  document.getElementById('sort-btn').addEventListener('click', sortItems);
  
  // Reset button
  document.getElementById('reset-btn').addEventListener('click', resetData);
  
  // Filter input
  document.getElementById('filter-input').addEventListener('input', function(e) {
    filterItems(e.target.value);
  });
  
  // Initial render (as specified in problem statement)
  renderData();
});

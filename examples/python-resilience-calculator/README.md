# Python Resilience Calculator

A Python module for calculating resilience as the capacity to absorb shocks. This example demonstrates fundamental programming concepts including function definitions, error handling, and mathematical calculations.

## Overview

The resilience calculator computes a resilience score based on two factors:
- **Shocks**: The number or magnitude of disruptions/challenges
- **Capacity**: The ability to absorb and recover from those shocks

**Formula**: `Resilience = Capacity / Shocks`

When there are no shocks (shocks = 0), resilience is considered infinite, representing a perfect state.

## Files

- **resilience_calculator.py** - Main module with calculator functions
- **test_resilience_calculator.py** - Comprehensive unit tests
- **demo.py** - Interactive demonstration script
- **README.md** - This documentation

## Features

- ✅ **Basic Resilience Calculation** - Calculate resilience score from shocks and capacity
- ✅ **Normalized Index** - Optional 0-100 scale normalization
- ✅ **Level Assessment** - Textual assessment of resilience levels
- ✅ **Multiple Scenarios** - Analyze multiple scenarios at once
- ✅ **Error Handling** - Handles division by zero gracefully
- ✅ **Comprehensive Tests** - Full unit test coverage

## Installation

No external dependencies required! This uses only Python standard library.

### Requirements

- Python 3.6 or higher

### Setup

1. **Navigate to the directory:**
   ```bash
   cd examples/python-resilience-calculator
   ```

2. **No installation needed** - it's ready to use!

## Usage

### Basic Example (from problem statement)

```python
from resilience_calculator import calculate_resilience

shocks = 5
capacity = 100
resilience = calculate_resilience(shocks, capacity)
print(f"Resilience score: {resilience}")
# Output: Resilience score: 20.0
```

### Running the Main Module

```bash
python resilience_calculator.py
```

**Output:**
```
============================================================
Resilience Calculator - Example Usage
============================================================

Basic Example:
  Shocks: 5
  Capacity: 100
  Resilience score: 20.0
  Assessment: Good - High resilience

============================================================
Multiple Scenario Analysis
============================================================

High Capacity, Low Shocks:
  Shocks: 2
  Capacity: 100
  Resilience: 50.0
  Assessment: Excellent - Very high resilience

...
```

### Advanced Usage

#### Normalized Resilience Index

```python
from resilience_calculator import calculate_resilience_index

# Get resilience on a 0-100 scale
index = calculate_resilience_index(shocks=10, capacity=100, normalize=True)
print(f"Resilience index: {index}")
# Output: Resilience index: 10.0
```

#### Assess Resilience Level

```python
from resilience_calculator import assess_resilience_level

score = 35.0
assessment = assess_resilience_level(score)
print(f"Assessment: {assessment}")
# Output: Assessment: Good - High resilience
```

#### Multiple Scenarios

```python
from resilience_calculator import calculate_multiple_scenarios

scenarios = [
    ("City A", 5, 100),
    ("City B", 10, 80),
    ("City C", 3, 150),
]

results = calculate_multiple_scenarios(scenarios)

for result in results:
    print(f"{result['name']}: {result['resilience']:.2f} - {result['assessment']}")
```

## Running Tests

Run the comprehensive unit test suite:

```bash
python test_resilience_calculator.py
```

Or with verbose output:

```bash
python test_resilience_calculator.py -v
```

**Expected output:**
```
test_assess_resilience_level ... ok
test_calculate_multiple_scenarios ... ok
test_calculate_resilience_basic ... ok
test_calculate_resilience_decimal ... ok
test_calculate_resilience_index_normalized ... ok
test_calculate_resilience_index_not_normalized ... ok
test_calculate_resilience_zero_shocks ... ok
test_edge_cases ... ok

----------------------------------------------------------------------
Ran 8 tests in 0.001s

OK
```

## API Reference

### `calculate_resilience(shocks, capacity)`

Calculate basic resilience score.

**Parameters:**
- `shocks` (int/float): Number or magnitude of shocks
- `capacity` (int/float): Capacity to absorb shocks

**Returns:**
- `float`: Resilience score (infinity if shocks = 0)

**Example:**
```python
resilience = calculate_resilience(5, 100)  # Returns 20.0
```

### `calculate_resilience_index(shocks, capacity, normalize=False)`

Calculate resilience with optional normalization.

**Parameters:**
- `shocks` (int/float): Number or magnitude of shocks
- `capacity` (int/float): Capacity to absorb shocks
- `normalize` (bool): If True, normalize to 0-100 scale

**Returns:**
- `float`: Resilience index

**Example:**
```python
index = calculate_resilience_index(5, 100, normalize=True)  # Returns 20.0
```

### `assess_resilience_level(resilience_score)`

Assess resilience level from score.

**Parameters:**
- `resilience_score` (float): The resilience score

**Returns:**
- `str`: Textual assessment

**Levels:**
- `inf`: "Perfect - No shocks detected"
- `>= 50`: "Excellent - Very high resilience"
- `>= 20`: "Good - High resilience"
- `>= 10`: "Moderate - Average resilience"
- `>= 5`: "Fair - Below average resilience"
- `< 5`: "Poor - Low resilience"

### `calculate_multiple_scenarios(scenarios)`

Calculate resilience for multiple scenarios.

**Parameters:**
- `scenarios` (list): List of tuples `(name, shocks, capacity)`

**Returns:**
- `list`: List of dictionaries with results

**Example:**
```python
scenarios = [
    ("Scenario A", 5, 100),
    ("Scenario B", 10, 50),
]
results = calculate_multiple_scenarios(scenarios)
```

## Use Cases

### 1. System Resilience Analysis

Evaluate how well a system can handle disruptions:

```python
# Database system
db_shocks = 15  # Number of failures per month
db_capacity = 300  # Recovery capacity
db_resilience = calculate_resilience(db_shocks, db_capacity)
print(f"Database resilience: {db_resilience}")
```

### 2. Organizational Assessment

Measure organizational resilience:

```python
# Team resilience during crisis
team_scenarios = [
    ("Team A", 8, 200),   # 8 challenges, high capacity
    ("Team B", 12, 150),  # 12 challenges, medium capacity
    ("Team C", 5, 180),   # 5 challenges, high capacity
]

results = calculate_multiple_scenarios(team_scenarios)
```

### 3. Infrastructure Planning

Plan infrastructure based on expected shocks:

```python
# Power grid analysis
power_shocks = 3  # Expected outages per year
power_capacity = 150  # Backup capacity
power_resilience = calculate_resilience_index(
    power_shocks, 
    power_capacity, 
    normalize=True
)
```

## Customization

### Changing Assessment Thresholds

Modify the `assess_resilience_level` function to adjust thresholds:

```python
def assess_resilience_level(resilience_score):
    if resilience_score >= 40:  # Changed from 50
        return "Excellent"
    # ... etc
```

### Adding New Metrics

Extend the calculator with additional metrics:

```python
def calculate_recovery_time(shocks, capacity, base_time=1.0):
    """Calculate estimated recovery time."""
    resilience = calculate_resilience(shocks, capacity)
    if resilience == float('inf'):
        return 0
    return base_time / resilience
```

## Mathematical Background

The resilience formula is based on the concept that:
- **Higher capacity** → Better ability to absorb shocks → Higher resilience
- **More shocks** → Greater stress on system → Lower resilience
- **No shocks** → Perfect conditions → Infinite resilience

This is a simplified model. Real-world resilience involves many factors including:
- Recovery speed
- Adaptive capacity
- Resource availability
- Network effects

## Examples

### Example 1: Basic Usage

```python
shocks = 5
capacity = 100
print(f"Resilience score: {calculate_resilience(shocks, capacity)}")
# Output: Resilience score: 20.0
```

### Example 2: Zero Shocks

```python
shocks = 0
capacity = 100
resilience = calculate_resilience(shocks, capacity)
print(f"Resilience: {resilience}")
# Output: Resilience: inf
```

### Example 3: Comparing Systems

```python
systems = [
    ("System A", 10, 200),
    ("System B", 15, 200),
    ("System C", 10, 150),
]

results = calculate_multiple_scenarios(systems)

for r in results:
    print(f"{r['name']}: {r['resilience']:.1f} ({r['assessment']})")
```

## Best Practices

1. **Validate inputs** - Ensure shocks and capacity are non-negative
2. **Consider context** - Resilience thresholds vary by domain
3. **Use normalized index** - For comparing across different scales
4. **Test edge cases** - Zero shocks, very large numbers, etc.
5. **Document assumptions** - What constitutes a "shock" and "capacity"

## Troubleshooting

### ImportError: No module named 'resilience_calculator'

**Solution:** Make sure you're in the correct directory:
```bash
cd examples/python-resilience-calculator
python test_resilience_calculator.py
```

### Tests Failing

**Solution:** Check Python version (requires 3.6+):
```bash
python --version
```

## Contributing

Feel free to extend this calculator with:
- Additional resilience metrics
- Visualization capabilities
- Time-series analysis
- Predictive modeling

## License

This example is provided for educational purposes. Feel free to use and modify for your projects.

## Further Reading

- [Resilience Theory](https://en.wikipedia.org/wiki/Resilience_(organizational))
- [System Dynamics](https://en.wikipedia.org/wiki/System_dynamics)
- [Python Documentation](https://docs.python.org/3/)

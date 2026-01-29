"""
Resilience Calculator

A Python module for calculating resilience as the capacity to absorb shocks.
"""

def calculate_resilience(shocks, capacity):
    """Calculate resilience as the capacity to absorb shocks.
    
    Args:
        shocks (int or float): The number or magnitude of shocks
        capacity (int or float): The capacity to absorb shocks
        
    Returns:
        float: The resilience score. Returns infinity if shocks is 0.
        
    Examples:
        >>> calculate_resilience(5, 100)
        20.0
        >>> calculate_resilience(10, 50)
        5.0
        >>> calculate_resilience(0, 100)
        inf
    """
    return capacity / shocks if shocks != 0 else float('inf')


def calculate_resilience_index(shocks, capacity, normalize=False):
    """Calculate a resilience index with optional normalization.
    
    Args:
        shocks (int or float): The number or magnitude of shocks
        capacity (int or float): The capacity to absorb shocks
        normalize (bool): If True, normalize the result to 0-100 scale
        
    Returns:
        float: The resilience index
    """
    resilience = calculate_resilience(shocks, capacity)
    
    if resilience == float('inf'):
        return 100.0 if normalize else resilience
    
    if normalize:
        # Normalize to 0-100 scale (assuming max resilience of 100)
        return min(100.0, resilience)
    
    return resilience


def assess_resilience_level(resilience_score):
    """Assess the resilience level based on the score.
    
    Args:
        resilience_score (float): The resilience score
        
    Returns:
        str: A textual assessment of the resilience level
    """
    if resilience_score == float('inf'):
        return "Perfect - No shocks detected"
    elif resilience_score >= 50:
        return "Excellent - Very high resilience"
    elif resilience_score >= 20:
        return "Good - High resilience"
    elif resilience_score >= 10:
        return "Moderate - Average resilience"
    elif resilience_score >= 5:
        return "Fair - Below average resilience"
    else:
        return "Poor - Low resilience"


def calculate_multiple_scenarios(scenarios):
    """Calculate resilience for multiple scenarios.
    
    Args:
        scenarios (list): List of tuples (name, shocks, capacity)
        
    Returns:
        list: List of dictionaries with scenario results
    """
    results = []
    
    for scenario in scenarios:
        name, shocks, capacity = scenario
        resilience = calculate_resilience(shocks, capacity)
        assessment = assess_resilience_level(resilience)
        
        results.append({
            'name': name,
            'shocks': shocks,
            'capacity': capacity,
            'resilience': resilience,
            'assessment': assessment
        })
    
    return results


# Example usage:
if __name__ == "__main__":
    print("=" * 60)
    print("Resilience Calculator - Example Usage")
    print("=" * 60)
    
    # Basic example from problem statement
    shocks = 5
    capacity = 100
    resilience = calculate_resilience(shocks, capacity)
    print(f"\nBasic Example:")
    print(f"  Shocks: {shocks}")
    print(f"  Capacity: {capacity}")
    print(f"  Resilience score: {resilience}")
    print(f"  Assessment: {assess_resilience_level(resilience)}")
    
    # Multiple scenarios
    print("\n" + "=" * 60)
    print("Multiple Scenario Analysis")
    print("=" * 60)
    
    scenarios = [
        ("High Capacity, Low Shocks", 2, 100),
        ("Moderate Scenario", 10, 100),
        ("High Stress", 20, 100),
        ("Low Capacity", 10, 50),
        ("No Shocks", 0, 100),
    ]
    
    results = calculate_multiple_scenarios(scenarios)
    
    for result in results:
        print(f"\n{result['name']}:")
        print(f"  Shocks: {result['shocks']}")
        print(f"  Capacity: {result['capacity']}")
        print(f"  Resilience: {result['resilience']}")
        print(f"  Assessment: {result['assessment']}")
    
    # Normalized resilience index
    print("\n" + "=" * 60)
    print("Normalized Resilience Index (0-100 scale)")
    print("=" * 60)
    
    test_cases = [
        (5, 100),
        (10, 100),
        (20, 50),
        (50, 100),
    ]
    
    for shocks, capacity in test_cases:
        normalized = calculate_resilience_index(shocks, capacity, normalize=True)
        print(f"  Shocks: {shocks:3d}, Capacity: {capacity:3d} -> Index: {normalized:6.2f}")

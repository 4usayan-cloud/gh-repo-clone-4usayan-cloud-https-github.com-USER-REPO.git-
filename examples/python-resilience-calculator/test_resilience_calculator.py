"""
Unit tests for the Resilience Calculator
"""

import unittest
from resilience_calculator import (
    calculate_resilience,
    calculate_resilience_index,
    assess_resilience_level,
    calculate_multiple_scenarios
)


class TestResilienceCalculator(unittest.TestCase):
    """Test cases for the resilience calculator functions."""
    
    def test_calculate_resilience_basic(self):
        """Test basic resilience calculation."""
        self.assertEqual(calculate_resilience(5, 100), 20.0)
        self.assertEqual(calculate_resilience(10, 100), 10.0)
        self.assertEqual(calculate_resilience(20, 100), 5.0)
    
    def test_calculate_resilience_zero_shocks(self):
        """Test resilience calculation with zero shocks."""
        self.assertEqual(calculate_resilience(0, 100), float('inf'))
        self.assertEqual(calculate_resilience(0, 50), float('inf'))
    
    def test_calculate_resilience_decimal(self):
        """Test resilience calculation with decimal values."""
        self.assertAlmostEqual(calculate_resilience(2.5, 100), 40.0)
        self.assertAlmostEqual(calculate_resilience(7.5, 75), 10.0)
    
    def test_calculate_resilience_index_normalized(self):
        """Test normalized resilience index."""
        # Test normalization
        self.assertEqual(calculate_resilience_index(5, 100, normalize=True), 20.0)
        self.assertEqual(calculate_resilience_index(1, 100, normalize=True), 100.0)
        self.assertEqual(calculate_resilience_index(0, 100, normalize=True), 100.0)
        
        # Test that values above 100 are capped
        self.assertEqual(calculate_resilience_index(0.5, 100, normalize=True), 100.0)
    
    def test_calculate_resilience_index_not_normalized(self):
        """Test non-normalized resilience index."""
        self.assertEqual(calculate_resilience_index(5, 100, normalize=False), 20.0)
        self.assertEqual(calculate_resilience_index(0, 100, normalize=False), float('inf'))
    
    def test_assess_resilience_level(self):
        """Test resilience level assessment."""
        self.assertEqual(assess_resilience_level(float('inf')), "Perfect - No shocks detected")
        self.assertEqual(assess_resilience_level(75), "Excellent - Very high resilience")
        self.assertEqual(assess_resilience_level(30), "Good - High resilience")
        self.assertEqual(assess_resilience_level(15), "Moderate - Average resilience")
        self.assertEqual(assess_resilience_level(7), "Fair - Below average resilience")
        self.assertEqual(assess_resilience_level(2), "Poor - Low resilience")
    
    def test_calculate_multiple_scenarios(self):
        """Test multiple scenario calculation."""
        scenarios = [
            ("Test 1", 5, 100),
            ("Test 2", 10, 50),
            ("Test 3", 0, 100),
        ]
        
        results = calculate_multiple_scenarios(scenarios)
        
        self.assertEqual(len(results), 3)
        self.assertEqual(results[0]['resilience'], 20.0)
        self.assertEqual(results[1]['resilience'], 5.0)
        self.assertEqual(results[2]['resilience'], float('inf'))
        
        # Check that all required keys are present
        for result in results:
            self.assertIn('name', result)
            self.assertIn('shocks', result)
            self.assertIn('capacity', result)
            self.assertIn('resilience', result)
            self.assertIn('assessment', result)
    
    def test_edge_cases(self):
        """Test edge cases."""
        # Very small numbers
        self.assertAlmostEqual(calculate_resilience(0.001, 1), 1000.0)
        
        # Large numbers
        self.assertEqual(calculate_resilience(1000, 10000), 10.0)
        
        # Equal values
        self.assertEqual(calculate_resilience(50, 50), 1.0)


if __name__ == '__main__':
    unittest.main()

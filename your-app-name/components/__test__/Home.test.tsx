import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../Home/Home';


describe('Home', () => {
  test('renders home component', () => {
    render(<Home />);
    
    // Assert that a specific element is present in the rendered component
    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });

  test('handles input changes and calculates the number of days', () => {
    render(<Home />);
    
    // Simulate input changes
    const startDateInput = screen.getByLabelText('Start Date');
    fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });

    const endDateInput = screen.getByLabelText('End Date');
    fireEvent.change(endDateInput, { target: { value: '2023-01-05' } });
    
    // Trigger the calculation
    const calculateButton = screen.getByText('Calculate');
    fireEvent.click(calculateButton);

    // Assert that the result is displayed correctly
    expect(screen.getByText('The number of days between the selected dates is: 5')).toBeInTheDocument();
  });

  // Add more tests as needed...
});

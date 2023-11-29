import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders search input and button', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText('Skriv in sökord...');
  const buttonElement = screen.getByText('Sök');
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test('displays error message for empty search', async () => {
  render(<App />);
  const buttonElement = screen.getByText('Sök');
  fireEvent.click(buttonElement);
  const errorMessage = await screen.findByText('Sökfältet får inte vara tomt');
  expect(errorMessage).toBeInTheDocument();
});



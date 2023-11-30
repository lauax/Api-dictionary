import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// Testar om sök-input och knapp finns på sidan
test('renders search input and button', () => {
  render(<App />);
  // Hitta input-elementet genom att leta efter dess placeholder-text
  const inputElement = screen.getByPlaceholderText('Skriv in sökord...');
  // Hitta knapp-elementet genom att leta efter dess textinnehåll
  const buttonElement = screen.getByText('Sök');
  // Kontrollera om input- och knapp-elementen finns i DOM:en
  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

// Testar om ett felmeddelande visas för tom sökning
test('displays error message for empty search', async () => {
  render(<App />);
  // Hitta knapp-elementet för att initiera en tom sökning
  const buttonElement = screen.getByText('Sök');
  // Simulera en klick-händelse på knappen för att initiera sökningen
  fireEvent.click(buttonElement);
  // Vänta på att felmeddelandet ska visas och hitta det i DOM:en
  const errorMessage = await screen.findByText('Sökfältet får inte vara tomt');
  // Kontrollera om felmeddelandet finns i DOM:en
  expect(errorMessage).toBeInTheDocument();
});

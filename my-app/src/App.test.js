// Import av nödvändiga funktioner och komponenter från testbibliotek och App-komponenten
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Testfall: Kontrollerar att sökfält och knapp renderas korrekt
test('rendrerar sökfält och knapp', () => {
  // Renderar App-komponenten i testmiljön
  render(<App />);
  // Hämtar sökfältet baserat på dess placeholder-text och verifierar att det finns i dokumentet
  const inputElement = screen.getByPlaceholderText('Skriv in sökord...');
  expect(inputElement).toBeInTheDocument();
});

// Testfall: Kontrollerar att felmeddelande visas vid tom sökning
test('visar felmeddelande vid tom sökning', async () => {
  // Renderar App-komponenten i testmiljön
  render(<App />);
  // Hämtar knappen för att utföra sökning
  const buttonElement = screen.getByText('Sök');
  // Klickar på sökknappen
  fireEvent.click(buttonElement);
  // Väntar på att felmeddelandet för tom sökning ska visas och verifierar dess närvaro
  const errorMessage = await screen.findByText('Sökfältet får inte vara tomt');
  expect(errorMessage).toBeInTheDocument();
});

// Testfall: Kontrollerar att ord visas efter en framgångsrik sökning
test('visar ord efter framgångsrik sökning', async () => {
  // Renderar App-komponenten i testmiljön
  render(<App />);

  // Hämtar sökfältet och sökknappen
  const inputElement = screen.getByPlaceholderText('Skriv in sökord...');
  const buttonElement = screen.getByText('Sök');

  // Simulerar en ändring i sökfältet till ordet 'hi' och klickar på sökknappen
  fireEvent.change(inputElement, { target: { value: 'hi' } });
  fireEvent.click(buttonElement);

  // Funktion för anpassad textmatchning
  const customTextMatcher = (content, element) => {
    // Kontrollerar om elementet eller dess barnnoder innehåller det angivna innehållet
    const hasText = (node) => node.textContent === content;
    const nodeHasText = hasText(element) || Array.from(element.childNodes).some(hasText);
    return nodeHasText ? element : null;
  };

  // Väntar på att ordet 'hi' ska visas i dokumentet och verifierar dess närvaro
  await waitFor(() => {
    const wordElement = screen.getByText((_content, element) => customTextMatcher('hi', element));
    expect(wordElement).toBeInTheDocument();
  });
});

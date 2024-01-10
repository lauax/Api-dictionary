import React, { useState } from 'react';
import './App.css';

function App() {
  // Tillståndsvariabler för sökterm, data för ordet och eventuella felmeddelanden
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState([]);
  const [error, setError] = useState('');

  // Funktion som körs vid förändring i inmatningsfältet för söktermen
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Funktion som körs vid sökning efter ordet
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setError('Sökfältet får inte vara tomt');
      setWordData([]); // Rensa ord-data
    } else {
      try {
        // Hämta data från API:et baserat på söktermen
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Något gick fel vid sökningen');
        }
        // Konvertera svaret till JSON-format och uppdatera tillståndsvariablerna
        const data = await response.json();
        setWordData(data);
        setError('');
      } catch (error) {
        // Vid fel, uppdatera felmeddelandet och rensa ord-data
        setError(error.message);
        setWordData([]);
      }
    }
  };

  // JSX för att rendera komponenten och visa ordboksdata och felmeddelanden
  return (
    <div>
      {/* Header för applikationen */}
      <header className="header">Dictionary</header>
      <div className="container">
        {/* Formulär för att skriva in och söka efter ord */}
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Skriv in sökord..."
          />
          <button type="button" onClick={handleSearch}>Sök</button> 
        </form>
        {/* Visa felmeddelande om det finns ett fel */}
        {error && <p className="error">{error}</p>}
        {/* ... resten av ditt JSX */}
        {wordData.length > 0 && (
          <div className="word-info">
            {/* Visa ordet och dess uttal */}
            <h2>Word: {wordData[0].word}</h2>
            <div className="pronunciation">
              <h3>Pronunciation:</h3>
              {wordData[0].phonetics.map((phonetic, index) => (
                <p key={index}>{phonetic.text}</p>
              ))}
            </div>
            {/* Visa betydelser och dess definitioner */}
            {/* ... */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

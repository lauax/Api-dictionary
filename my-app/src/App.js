import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Tillståndsvariabler för sökterm, data för ordet och eventuella felmeddelanden
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState([]);
  const [error, setError] = useState('');

  // useEffect körs varje gång searchTerm ändras för att hämta data för det sökta ordet
  useEffect(() => {
    // Asynkron funktion för att hämta data från ordboks-API:et
    async function fetchWordData() {
      try {
        // Hämta data från API:et baserat på söktermen
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        if (!response.ok) {
          throw new Error('No definitions found for this word.');
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

    // Kontrollera om det finns en sökterm och kör funktionen för att hämta data
    if (searchTerm.trim() !== '') {
      fetchWordData();
    }
  }, [searchTerm]); // useEffect körs varje gång searchTerm ändras

  // Funktion som körs vid förändring i inmatningsfältet för söktermen
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
            placeholder="Search for a word..."
          />
        </form>

        {/* Visa felmeddelande om det finns ett fel */}
        {error && <p className="error">{error}</p>}

        {/* Visa ordinformation om det finns data för ett sökt ord */}
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
            <div className="meanings">
              <br></br>
              <h3>Meanings:</h3>
              {wordData[0].meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex} className="meaning">
                  {/* Visa ordklassen och dess definitioner */}
                  <br></br>
                  <h4>{meaning.partOfSpeech}:</h4>
                  {meaning.definitions.map((definition, defIndex) => (
                    <div key={defIndex}>
                      {/* Visa definitionen, synonymer och antonymer */}
                      <p>{definition.definition}</p>
                      {definition.synonyms.length > 0 && (
                        <p><strong>Synonyms:</strong> {definition.synonyms.join(', ')}</p>
                      )}
                      {definition.antonyms.length > 0 && (
                        <p><strong>Antonyms:</strong> {definition.antonyms.join(', ')}</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Visa exempel på användning av ordet */}
            <div className="examples">
              <br></br>
              <h3>Examples:</h3>
              {wordData[0].meanings.map((meaning) => (
                meaning.definitions.map((definition) => (
                  <ul key={definition.definition}>
                    {definition.example && <li>{definition.example}</li>}
                  </ul>
                ))
              ))}
            </div>

            {/* Visa ljudutal av ordet */}
            <div className="source">
              <br></br>
              <h3>Audio Pronunciation:</h3>
              {wordData[0].phonetics.slice(0, 2).map((phonetic, index) => (
                <div key={index}>
                  {phonetic.audio && (
                    <audio controls>
                      <source src={phonetic.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

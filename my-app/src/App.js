import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [wordData, setWordData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWordData() {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        if (!response.ok) {
          throw new Error('No definitions found for this word.');
        }
        const data = await response.json();
        setWordData(data);
        setError('');
      } catch (error) {
        setError(error.message);
        setWordData([]);
      }
    }

    if (searchTerm.trim() !== '') {
      fetchWordData();
    }
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <header className="header">Dictionary</header>
      <div className="container">
        <form>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for a word..."
          />
        </form>

        {error && <p className="error">{error}</p>}

        {wordData.length > 0 && (
          <div className="word-info">
            <h2>Word: {wordData[0].word}</h2>

            <div className="pronunciation">
              <h3>Pronunciation:</h3>
              {wordData[0].phonetics.map((phonetic, index) => (
                <p key={index}>{phonetic.text}</p>
              ))}
            </div>

            <div className="meanings">
              <br></br>
              <h3>Meanings:</h3>
              {wordData[0].meanings.map((meaning, meaningIndex) => (
                <div key={meaningIndex} className="meaning">
                  <br></br>
                  <h4>{meaning.partOfSpeech}:</h4>
                  {meaning.definitions.map((definition, defIndex) => (
                    <div key={defIndex}>
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

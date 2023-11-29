export async function fetchAllWords() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let allWords = [];

  try {
    for (const letter of alphabet) {
      const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${letter}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch words starting with ${letter}`);
      }

      const data = await response.json();
      const wordsFromLetter = data.map(entry => entry.word);
      allWords = [...allWords, ...wordsFromLetter];
    }

    return allWords;
  } catch (error) {
    throw new Error(`There was a problem with the fetch operation: ${error}`);
  }
}

import React from 'react';
import './AlphabetFilter.css';

const AlphabetFilter = ({ selectedLetter, onLetterSelect, contacts }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Get available letters (letters that have contacts)
  const availableLetters = new Set(
    contacts.map(contact => contact.name.charAt(0).toUpperCase())
  );

  return (
    <div className="alphabet-filter">
      <button
        className={`alphabet-btn ${selectedLetter === null ? 'active' : ''}`}
        onClick={() => onLetterSelect(null)}
      >
        ALL
      </button>
      {alphabet.map(letter => (
        <button
          key={letter}
          className={`alphabet-btn ${selectedLetter === letter ? 'active' : ''} ${
            !availableLetters.has(letter) ? 'disabled' : ''
          }`}
          onClick={() => availableLetters.has(letter) && onLetterSelect(letter)}
          disabled={!availableLetters.has(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetFilter;
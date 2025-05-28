import React, { useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({
  cancionIngresada,
  handleInputChange,
  handleKeyDown,
  sugerencias,
  handleSuggestionClick,
  selectedSuggestionIndex,
  disabled,
}) => {
  const suggestionRefs = useRef([]);
  suggestionRefs.current = []; // Limpiar refs

  useEffect(() => {
    if (
      selectedSuggestionIndex >= 0 &&
      suggestionRefs.current[selectedSuggestionIndex]
    ) {
      suggestionRefs.current[selectedSuggestionIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    }
  }, [selectedSuggestionIndex]);

  return (
    <div className="relative flex border-2 border-gray-400 bg-zinc-100 rounded-md w-full z-10">
      <button
        id="search-button"
        className="hover:bg-gray-300 rounded-s p-2"
      >
        <MagnifyingGlassIcon className="stroke-slate-700 dark:stroke-gray-400 h-6 w-6" />
      </button>
      <input
        type="text"
        value={cancionIngresada}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        id="search-input"
        placeholder="Search for songs"
        className="flex-grow bg-transparent outline-none px-2 text-gray-800 placeholder-gray-500"
      />
      {sugerencias.length > 0 && (
        <ul className="absolute top-full left-0 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-b shadow-md z-20 text-gray-800">
        {sugerencias.map((sugerencia, index) => (
          <li
            key={index}
            ref={(el) => (suggestionRefs.current[index] = el)}
            onClick={() => handleSuggestionClick(sugerencia)}
            className={`cursor-pointer p-2 flex items-center gap-2 ${
              index === selectedSuggestionIndex ? 'bg-gray-300' : ''
            }`}
          >
            <img
              src={sugerencia.album}
              alt={sugerencia.title}
              className="w-10 h-10 rounded"
            />
            <span>{sugerencia.title}</span>
          </li>
        ))}
      </ul>
      
      )}
    </div>
  );
};

export default SearchBar;

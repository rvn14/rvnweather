import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const API_KEY = "4f09ff227c7660603a5c858137c207fc"; // Your OpenWeatherMap API key

const GeoSearchBar = ({ setLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimeout = useRef(null);
  const inputRef = useRef(null);

  // Fetch suggestions from the OpenWeatherMap Geo API
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }
    try {
      const limit = 5;
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          searchQuery
        )}&limit=${limit}&appid=${API_KEY}`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    }
  };

  // Handle input changes with debouncing
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        selectSuggestion(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // When a suggestion is selected, update the input, location state, and close suggestions
  const selectSuggestion = (suggestion) => {
    const locationText = `${suggestion.name}${
      suggestion.state ? ', ' + suggestion.state : ''
    }, ${suggestion.country}`;
    setQuery(locationText);
    setLocation(suggestion); // Update location state with the full suggestion object
    setShowSuggestions(false);
    setSuggestions([]);
    console.log('Selected location:', suggestion);
  };

  // Handle click on a suggestion
  const handleSuggestionClick = (index) => {
    selectSuggestion(suggestions[index]);
  };

  // Hide suggestions after a short delay when input loses focus
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  // Clear the search bar, reset location, and refocus the input
  const clearQuery = () => {
    setQuery('');
    setLocation(null);
    setSuggestions([]);
    setActiveIndex(-1);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        {/* Search Icon on the left */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          ref={inputRef}
          className="w-full bg-[#ffffff18] rounded-2xl pl-10 pr-10 px-3 py-2 focus:outline-none focus:ring text-gray-100"
          placeholder="Enter location..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
        />
        {/* Clear Icon (X) on the right, rendered only when there is text */}
        {query && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={clearQuery}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.lat}-${suggestion.lon}-${index}`}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                activeIndex === index ? 'bg-blue-100' : ''
              }`}
              // Use onMouseDown with preventDefault to avoid multiple selection events
              onMouseDown={(e) => {
                e.preventDefault();
                handleSuggestionClick(index);
              }}
            >
              {suggestion.name}
              {suggestion.state ? `, ${suggestion.state}` : ''}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

GeoSearchBar.propTypes = {
  setLocation: PropTypes.func.isRequired,
};

export default GeoSearchBar;

/* eslint-disable react/prop-types */
import React from "react";

const SuggestionsList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
  selectedItem,
}) => {
  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <React.Fragment>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className={selectedItem === index ? "suggestion-item activate" : "suggestion-item"}
            id={`suggestion-${index}`}
          >
            {getHighlightedText(currSuggestion, highlight)}, {suggestion.country}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionsList;
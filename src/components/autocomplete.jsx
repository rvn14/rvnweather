/* eslint-disable react/prop-types */
import {useCallback, useEffect} from "react";
import {useState} from "react";
import "./search.css";
import SuggestionsList from "./suggestions-list";
import debounce from "lodash/debounce";
import { FaSearch,FaTimes } from "react-icons/fa" 
// import useCache from "../hooks/use-cache";


const Autocomplete = ({
  setLocation,
  staticData,
  fetchSuggestions,
  placeholder = "",
  customloading = "Loading...",
  // caching = true,
  onSelect = () => {},
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  customStyles = {},
  dataKey = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItem, setselectedItem] = useState(-1)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const {setCache, getCache} = useCache("autocomplete", 3600);

  const handleInputChange = (event) => {

    setInputValue(event.target.value);
    onChange(event.target.value);
    if (event.target.value.length > 1) {
      console.log("fetching");
      getSuggestionsDebounced(event.target.value);
    } else {
      setSuggestions([]);
    }
    

  };

  const getSuggestions = async (query) => {
    setError(null);

    setLoading(true);
    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
        result = result.slice(0,4)
      }
      // setCache(query, result);
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 300),
    []
  );

  // useEffect(() => {
  //   if (inputValue.length > 1) {
  //     console.log("fetching");
  //     getSuggestionsDebounced(inputValue);
  //   } else {
  //     setSuggestions([]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inputValue]);

  const handleSuggestionClick = (suggestion) => {
    if (suggestion) {
      setInputValue(dataKey ? suggestion[dataKey] : dataKey);
      onSelect(suggestion);
      setLocation(suggestion)
      setSuggestions([]);
      
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      console.log(e.key);
      setselectedItem(prew => prew - 1)
    }else if (e.key === "ArrowDown" && selectedItem < suggestions.length - 1) {
      setselectedItem(prew => prew + 1)
    }else if (e.key === "Enter" && selectedItem >= 0) {
      handleSuggestionClick(suggestions[selectedItem])
    }
  }

  const onClose = () => {
    setSuggestions([]);
    setInputValue("");

  }

  return (
    <div className="search-wrapper">
    <div className="input-wrapper">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

        {(suggestions.length > 0 || inputValue.length > 0) ? <FaTimes className="searchicon" onClick={onClose}/> : <FaSearch className="searchicon" onClick={handleSuggestionClick}/>}
      </div>

      
      
      
      

      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list" role="listbox" id="reslist">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customloading}</div>}
          <SuggestionsList 
            className="suggest-list"
            dataKey={dataKey}
            highlight={inputValue}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            selectedItem={selectedItem}

            
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
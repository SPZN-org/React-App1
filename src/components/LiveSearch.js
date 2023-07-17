import React, { useState, useCallback, useEffect, useRef } from "react";
import {data} from "../Data.js"
import Card from "./Card.js"

const LiveSearch = ({
  results = [],
  renderItem,
  value,
  onChange,
  onSelect,
  stateData, // Add stateData prop here
  toggleFavourite, // Add toggleFavourite prop here
}) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const resultContainer = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");

  const handleSelection = (selectedIndex) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect && onSelect(selectedItem);
    // resetSearchComplete();
    
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleKeyDown = (e) => {
    const { key } = e;
    let nextIndexCount = 0;

    // move down
    if (key === "ArrowDown")
      nextIndexCount = (focusedIndex + 1) % results.length;

    // move up
    if (key === "ArrowUp")
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;

    // hide search results
    if (key === "Escape") {
      resetSearchComplete();
    }

    // select the current item
    if (key === "Enter") {
      e.preventDefault();
      handleSelection(focusedIndex);
    }

    setFocusedIndex(nextIndexCount);
  };
  const [searchValue, setSearchValue] = React.useState("")
  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
    setSearchValue(value);
  };

  

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "center",
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);

    if (results.length <= 0) setShowResults(false);
  }, [results, showResults]);

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);
//Updated Testing Code

  const selectedCard = stateData.find(item => item.title === results.title);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        tabIndex={1}
        onBlur={resetSearchComplete}
        onKeyDown={handleKeyDown}
        className="relative"
      >
        <input
          value={defaultValue}
          onChange={handleChange}
          name = "Searchbar"
          type="text"
          className="w-[600px] px-5 py-3 text-lg rounded-full border-2 outline-none transition"
          placeholder="Search"
        />

        {/* Search Results Container */}
        {showResults && (
          <div className="absolute mt-1 w-full p-2 shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto">
          {results.map((item, index) => (
            <div
              key={index}
              // ... other props and styles
              style={{
                backgroundColor: index === focusedIndex ? "rgba(0,0,0,0)" : "",
              }}
              className="cursor-pointer "
            >
              {renderItem(item, toggleFavourite)}
            </div>
            ))}
          </div>
        )}
      </div>
      {/* Display selected card */}
      {selectedCard && (
        <Card
          item={selectedCard}
          toggleFavourite={toggleFavourite}
        />
      )}
      
    </div>
  );
};

export default LiveSearch;
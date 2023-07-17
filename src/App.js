import React, { useCallback } from "react";
import "./App.css";
import Card from "./components/Card.js";
import {data} from "./Data.js";
import SortBySection from "./components/SortBySection.js";
import LiveSearch from "./components/LiveSearch";



export default function App() {
 
    const [showFavourites, setShowFavourites] = React.useState(false)

  function toggleShowFavourites() {
    setShowFavourites((prevShowFavourites) => !prevShowFavourites);
    setShowCompleted(false); 
  };
 
  const [stateData, setStateData] = React.useState(data);
  
  
  const toggleFavourite = useCallback(
    (id) => {
      setStateData((prevStateData) =>
        prevStateData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isFavourite: !item.isFavourite,
            };
          }
          return item;
        })
      );
    },
    [setStateData, stateData]
  );

const [cards, setCards] = React.useState([]);
React.useEffect(() => {
  // Log the data whenever it changes
  console.log('Data:', stateData);
}, [stateData]);
// Use useEffect to update the cards state when data changes
React.useEffect(() => {
  setCards(data.map((item) => ({ ...item })));
}, [data]);


const filteredFavourites = stateData.filter((item) => item.isFavourite === true);  

const [showCompleted, setShowCompleted] = React.useState(false);
const completed = stateData.filter((item) => item.isCompleted === true);

const favouriteAndComplete = stateData.filter((item) => item.isCompleted === true && item.isFavourite === true);
function displayCompleted() {
    setShowCompleted(!showCompleted);
    setShowFavourites(false); // Reset showBoth state   
}



const [searchValue, setSearchValue] = React.useState("");

  const filteredData = stateData.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const [results, setResults] = React.useState({});
  const [selectedProfile, setSelectedProfile] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState(null);
//This is the code to adjust live search bar
  const handleChange = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);
    const searchQuery = target.value.toLowerCase();
    const filteredValue = data.filter((profile) =>
      profile.title.toLowerCase().startsWith(searchQuery)
    );
    setResults(filteredValue);
  };

  const selectedCard = stateData.find(item => item.title === selectedProfile?.title);


  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

    return(
        <div>
            <LiveSearch
              results={results}
              value={selectedProfile?.title}
              renderItem={(item) => <Card item={item} />}
              stateData={stateData}
              toggleFavourite={toggleFavourite}
              onChange={handleChange}
              onSelect = {handleSelectItem}
            />
            {selectedCard && (
              <Card
                item={selectedCard}
                toggleFavourite={toggleFavourite}
              />
            )}
            
            <button
                className = "button--fav"
                onClick={toggleShowFavourites}
            >
               {showFavourites ? "Show All" : "Favourites"}
            </button>
            <button
                onClick = {displayCompleted}
            >{showCompleted ? "Show All" : "Show Completed"}
            </button>   

      {/* Display ShowFavourites component when showFavourites is true */}
      {showFavourites && (
        <SortBySection data={filteredFavourites} toggleFavourite={toggleFavourite} />
      )}

      {/* Display ShowCompleted component when showCompleted is true */}
      {showCompleted && (
        <SortBySection data={completed} toggleFavourite={toggleFavourite} />
      )}

      {/* Display SortBySection component when both showFavourites and showCompleted are false */}
      {!showFavourites && !showCompleted && (
        <SortBySection data={stateData} toggleFavourite={toggleFavourite} />
      )}

      {/* Display cards where both isCompleted and isFavourite are true */}
      {showFavourites && showCompleted && (
        <SortBySection data={favouriteAndComplete} toggleFavourite={toggleFavourite} />
      )}
              
            
        </div>
    )    
}


import { useState, useEffect } from "react";
import { getAllGames } from "../collect/collectGames.jsx";
import { Game } from "./Game.jsx";
import "./Games.css";

export const GameList = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchedGame, setSearchedGame] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  useEffect(() => {
    getAllGames().then((gamesArray) => {
      setGames(gamesArray);
      setFilteredGames(gamesArray); // Set both states initially
    });
  }, []);

  // Search games based on the search input and selected category
  useEffect(() => { //This is used to filter the games based on two criteria:
    const foundGames = games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(searchedGame.toLowerCase()); //This checks whether the game's name (converted to lowercase) includes the search string (also in lowercase) from the searchedGame state.
      const matchesCategory = selectedCategory ? game.category.name === selectedCategory : true; // matches the games category with the category chosen by the user
      return matchesSearch && matchesCategory; // Return games that match both or one conditions
    });

    
    setFilteredGames(foundGames);
  }, [searchedGame, selectedCategory, games]); // sets that to the filtered games state which is an array

  return (
    <div className="game-container">
      <h2>Game Reviews</h2>

      <div>
        <input
          onChange={(event) => {
            setSearchedGame(event.target.value); // event shows the user is typing, target shows the user is changing it, value sets what the user is typing to value
          }}
          type="text"
          placeholder="Search Games"
          className="game-search"
        />
      </div>

      <div className="category-filter">
        <label htmlFor="category-select" className="font">
          Select Category:
        </label>
        <select
          id="category-select"
          className="font-two"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="">All</option>
          <option value="fighting">Fighting</option>
          <option value="shooting">Shooting</option>
          <option value="survival">Survival</option>
        </select>
      </div>

      <article className="games">
        {filteredGames.map((gameObj) => {
          return (
            <Game
              game={gameObj}
              key={gameObj.id}
            />
          );
        })}
      </article>
    </div>
  );
};


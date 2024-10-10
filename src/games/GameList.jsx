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
  useEffect(() => {
    const foundGames = games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(searchedGame.toLowerCase());
      const matchesCategory = selectedCategory ? game.category.name === selectedCategory : true; // Adjusted to access category name
      return matchesSearch && matchesCategory; // Return games that match both conditions
    });

    console.log("Filtered games:", foundGames); // Debugging statement
    setFilteredGames(foundGames);
  }, [searchedGame, selectedCategory, games]);

  return (
    <div className="game-container">
      <h2>Game Reviews</h2>

      <div>
        <input
          onChange={(event) => {
            setSearchedGame(event.target.value);
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


import { useState, useEffect } from "react";
import { getAllGames } from "../collect/collectGames.jsx";
import { Game } from "./Game.jsx"; 
import "./Games.css" 


export const GameList = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]); // New state for filtered games
  const [searchedGame, setSearchedGame] = useState("");

  useEffect(() => {
    getAllGames().then((gamesArray) => {
      setGames(gamesArray);
      setFilteredGames(gamesArray); // Set both states initially
    });
  }, []);

  useEffect(() => {
    const foundGames = games.filter((game) =>
      game.name.toLowerCase().includes(searchedGame.toLowerCase())
    );
    setFilteredGames(foundGames)
  }, [searchedGame, games]);

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

      <article className="games">
        {filteredGames.map((gameObj) => {
          return <Game game={gameObj} key={gameObj.id} />;
        })}
      </article>
    </div>
  );
};

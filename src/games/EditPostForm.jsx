import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGameById, updateGame } from "../collect/collectGames"; // Assuming these functions exist
import { getCategories } from "../collect/collectCategories"; // Make sure to import the function to fetch categories

export const EditPostForm = ({ currentUser }) => {
  const [game, setGame] = useState({ img: "", name: "", review: "", categoryId: "" });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { gameId } = useParams(); // Get the game ID from the URL parameters

  useEffect(() => {
    getCategories().then(setCategories); // Fetch categories when the component mounts
    getGameById(gameId).then(setGame); // Fetch the game details for the specific gameId
  }, [gameId]);

  const handleSave = (event) => {
    event.preventDefault();
    if (game.img && game.categoryId) {
      const updatedGame = {
        ...game,
        userId: currentUser.id, // Ensure the userId is included
      };

      // Update the game
      updateGame(gameId, updatedGame) 
        .then(() => {
          navigate("/post");
        });
    } else {
      window.alert("Please add an image and select a category before updating!");
    }
  };

  return (
    <form>
      <fieldset>
        <div className="holder">
          <label className="font">Add Img</label>
          <input
            className="font-two"
            type="text"
            placeholder="Copy Img URL here"
            value={game.img}
            onChange={(event) => setGame({ ...game, img: event.target.value })}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="holder">
          <label className="font">Add Name</label>
          <input
            className="font-two"
            type="text"
            value={game.name}
            onChange={(event) => setGame({ ...game, name: event.target.value })}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="holder">
          <label className="font">Add Review</label>
          <input
            className="font-two"
            type="text"
            value={game.review}
            onChange={(event) => setGame({ ...game, review: event.target.value })}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="holder">
          <label className="font">Select Category</label>
          <select
            className="font-two"
            value={game.categoryId}
            onChange={(event) => setGame({ ...game, categoryId: parseInt(event.target.value) })}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="btn-holder">
          <button className="btn" onClick={handleSave}>
            Update Post
          </button>
        </div>
      </fieldset>
    </form>
  );
};

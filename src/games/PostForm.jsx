import { useEffect, useState } from "react";
import "../css/PostForm.css";
import { createGame } from "../collect/collectGames";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../collect/collectCategories"; 

export const PostForm = ({ currentUser }) => {
  const [game, setGame] = useState({ img: "", name: "", review: "", categoryId: "" });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories
  useEffect(() => {
    getCategories().then(setCategories); 
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    if (game.img && game.categoryId) { // Ensure a category is selected
      const newGame = {
        img: game.img,
        name: game.name,
        review: game.review,
        categoryId: game.categoryId, // Use categoryId to reference the category
        userId: currentUser.id, // Associate the new game with the current user
      };

      // Create the new game
      createGame(newGame)
        .then(() => {
          navigate("/post");
        });
    } else {
      window.alert("Please add an image and select a category before posting!");
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
            onChange={(event) => {
              const postCopy = { ...game };
              postCopy.img = event.target.value;
              setGame(postCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="holder">
          <label className="font">Add Name</label>
          <input
            className="font-two"
            type="text"
            onChange={(event) => {
              const postCopy = { ...game };
              postCopy.name = event.target.value;
              setGame(postCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="holder">
          <label className="font">Add Review</label>
          <input
            className="font-two"
            type="text"
            onChange={(event) => {
              const postCopy = { ...game }; // creates a copy of the game 
              postCopy.review = event.target.value; // user edits the part
              setGame(postCopy); // finally sets the users new  adjustments
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="holder">
          <label className="font">Select Category</label>
          <select
            className="font-two"
            onChange={(event) => {
              const postCopy = { ...game };
              postCopy.categoryId = parseInt(event.target.value); // Use categoryId to reference the selected category
              setGame(postCopy);
            }}
            value={game.categoryId} // Set the value to the current categoryId
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
            Create Post
          </button>
        </div>
      </fieldset>
    </form>
  );
};



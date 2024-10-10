import { useEffect, useState } from "react";
import { getAllPost } from "../collect/collectedPost";
import "../css/Button.css";
import { useNavigate } from "react-router-dom";

export const UserGameList = ({ currentUser }) => { // prop passed that contains  the value of the current  users id
  const [post, setPost] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPost(currentUser.id).then((postArray) => { // fetches data  that contains whoever is the current user  using  userId as a parameter
      setPost(postArray);
    });
  }, [currentUser]);

  const deletePost = (gameId) => {
    return fetch(`http://localhost:8088/games/${gameId}`, {
      method: "DELETE",
    }).then(() => {
      // Remove the deleted post from the state
      setPost((prevPost) => prevPost.filter((game) => game.id !== gameId)); //prevPost holds an array set before a  user deletes a post then prevPost.filter((game) => game.id !== gameId): The filter() method creates a new array that excludes the game with  that id 
    });
  };

  return (
    <>
      {/* Place the header here, so it appears only once */}
      <h2 className="font">Your Posts</h2>
      {post.map((game) => (
        <section key={game.id}>
          <section className="game">
            <img className="game-img" src={game.img} alt={game.name} />
            <div className="game-info">{game.name}</div>
            <div className="game-info">{game.review}</div>
            <div className="btn-container">
              <button
                className="button"
                onClick={() => navigate(`/post/edit/${game.id}`)} // Navigate to the edit form
              >
                Edit
              </button>
              <button className="button" onClick={() => deletePost(game.id)}>
                Delete
              </button>
            </div>
          </section>
        </section>
      ))}

      {/* Create button is placed below all posts */}
      <button
        className="button"
        onClick={() => {
          navigate("/post/create");
        }}
      >
        Create
      </button>
    </>
  );
};



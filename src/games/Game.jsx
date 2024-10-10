
import { useEffect, useState } from "react";
import { getAllUsers } from "../collect/collectUsers";

export const Game = ({ game }) => { // game is a prop that holds all properties of the games
  const [users, setUsers] = useState([]); //useState: Allows you to create state variables in a functional component.
  const [matchedUser, setMatchedUser] = useState(null); //useEffect: Runs side effects in the component, like fetching data or updating the DOM.

  useEffect(() => {
    getAllUsers().then((userArray) => {
      setUsers(userArray);
    });
  }, []); // just set the state of users to the array we got from the fetch

  useEffect(() => {
    const foundUser = users.find((user) => user.id === game.userId); // checks using the find method to find the user.id that matches the userId of the game, so an integer
    setMatchedUser(foundUser); // once done sets the matcheduser state to it
  }, [users, game]); // a dependency array that runs the useeffect everytime one of those change

  return (
    <section className="game">
      <header className="game-info">
        Post by: {matchedUser ? matchedUser.userName : "Unknown"} 
      </header>
      <img className="game-img" src={game.img} alt={`${game.name}`} />
      <div className="game-info">{game.name}</div>
      <div className="game-info">{game.review}</div>
    </section>
  );
};
// 23 checks if a matchedUser is found. If yes, it displays matchedUser.userName. If no, it shows "Unknown".
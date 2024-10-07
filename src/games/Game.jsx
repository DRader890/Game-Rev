import { useEffect, useState } from "react";
import { getAllUsers } from "../collect/collectUsers";

export const Game = ({ game }) => {
  const [users, setUsers] = useState([]);
  const [matchedUser, setMatchedUser] = useState(null);

  useEffect(() => {
    getAllUsers().then((userArray) => {
      setUsers(userArray);
    });
  }, []);

  useEffect(() => {
    const foundUser = users.find(
      (user) => user.gameId === game.id
    );
    setMatchedUser(foundUser);
  }, [users, game]);

  return (
    <section className="game">
      <header className="game-info">Post by: {matchedUser ? matchedUser.userName : "Unknown"} </header>
      <img className="game-img" src={game.img} />
      <div>{game.name}</div>
      <div>{game.review}</div>
    </section>
  );
};

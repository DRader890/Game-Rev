export const getAllGames = () => {
  return fetch(`http://localhost:8088/games?_expand=category`).then(res => res.json());
};

export const createGame = (newGame) => {
  return fetch("http://localhost:8088/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  }).then((res) => res.json());
};

export const getGameById = (gameId) => {
  return fetch(`http://localhost:8088/games/${gameId}`)
    .then(response => response.json());
};

export const updateGame = (gameId, updatedGame) => { // game we want to  update, contains new data we want to update
  return fetch(`http://localhost:8088/games/${gameId}`, {
    method: "PUT", // edits the current game using its id
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedGame)
  });
};

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

export const updateGame = (gameId, updatedGame) => {
  return fetch(`http://localhost:8088/games/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedGame)
  });
};

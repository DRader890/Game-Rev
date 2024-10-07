export const getAllGames = () => {
  return fetch(`http://localhost:8088/games?_embed=users`).then((res) => res.json());
};

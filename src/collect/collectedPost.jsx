export const getAllPost = (userId) => {
  return fetch(`http://localhost:8088/games?userId=${userId}`).then((res) => res.json());
};


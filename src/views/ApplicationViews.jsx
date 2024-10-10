import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../nav/NavBar";
import { GameList } from "../games/GameList";
import { useEffect, useState } from "react";
import { UserGameList } from "../games/userGameList";
import { PostForm } from "../games/postForm";
import { EditPostForm } from "../games/EditPostForm"; // Import the EditPostForm component

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localHoneyUser);
    setCurrentUser(honeyUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<GameList />} />
        <Route path="post">
          <Route index element={<UserGameList currentUser={currentUser} />} />
          <Route path="create" element={<PostForm currentUser={currentUser} />} />
          <Route path="edit/:gameId" element={<EditPostForm currentUser={currentUser} />} /> {/* Add this line for editing */}
        </Route>
      </Route>
    </Routes>
  );
};

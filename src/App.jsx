import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import { GameList } from "./games/GameList";
import { NavBar } from "./nav/NavBar";
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"




export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      
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
      </Route>
    </Routes>
  );
};

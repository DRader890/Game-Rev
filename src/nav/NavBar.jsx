import "./NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/">All Post</Link>
      </li>
      <li className="navbar-item"></li>
    </ul>
  );
};

import "./NavBar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link">Game-Rev</Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          All Post
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/post">
          Your Post
        </Link>
      </li>
      {localStorage.getItem("honey_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("honey_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

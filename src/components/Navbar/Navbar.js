import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "components";
import { useAuthContext } from "contexts/auth";
import "./Navbar.css";

export default function Navbar() {
  const { user, handleLogout } = useAuthContext();
  return (
    <nav className="Navbar">
      <div className="content">
        <div className="logo">
          <Link to="/">
            <h1>RATE MY SETUP</h1>
          </Link>
        </div>

        <div className="socials">
          <Twitter fill="var(--pure-white)" />
          <Instagram fill="var(--pure-white)" />
          <Facebook fill="var(--pure-white)" />
        </div>

        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user?.email ? (
            <>
              <li>
                <span>{user.email}</span>
              </li>

              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

import { NavLink } from "react-router-dom";
import "./style.css";

const Nav = (props) => {
  return (
    <nav>
      <li>
        <NavLink to={`/`} className="nav-link">
          <h1 className="title">EventHero</h1>
        </NavLink>
      </li>
      <div className="nav-items">
        <li>
          <NavLink to={"/dashboard"} className="nav-link">
            <h2 className="nav-item">Dashboard</h2>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/browse"} className="nav-link">
            <h2 className="nav-item">Browse</h2>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/registered"} className="nav-link">
            <h2 className="nav-item">Registered</h2>
          </NavLink>
        </li>
      </div>
      <li>
        <NavLink to={"/profile"} className="nav-link">
          <img
            src={props.user.picture}
            alt="Your Profile Icon"
            width="40%"
            height="40%"
          />
        </NavLink>
      </li>
    </nav>
  );
};

export default Nav;

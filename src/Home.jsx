import { Link } from "react-router-dom";
import "./style.css";

const Nav = () => {
  return (
    <nav>
      <li>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <h1 className="title">EventHero</h1>
        </Link>
      </li>
      <li>
        <Link to={`/register`}>
          <button className="join-button">Join</button>
        </Link>
      </li>
    </nav>
  );
};

const Main = () => {
  return (
    <div className="main-container">
      <h2 className="main-headline">Welcome to EventHero</h2>
      <h3 className="main-subheadline">Your Go-To Destination for Events</h3>
    </div>
  );
};

const Trust = () => {
  return (
    <div className="trust-container">
      <h4 className="trust-text">Trusted By</h4>
      <div className="trust-logo-container">
        <img
          src="/img/yps.png"
          alt="Youth Pioneer Society Logo"
          className="trust-logo"
        />
        <img
          src="/img/aubh.png"
          alt="American University of Bahrain Logo"
          className="trust-logo"
        />
        <img
          src="/img/mys.png"
          alt="Ministry of Youth and Sport Affairs Logo"
          className="trust-logo"
        />
      </div>
    </div>
  );
};

const Showcase = () => {
  return (
    <div className="showcase-container">
      <img
        src="/img/showcase.png"
        alt="Showcase for Dashboard"
        id="showcase-image"
      />
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-page">
      <Nav />
      <Main />
      <Trust />
      <Showcase />
    </div>
  );
};

export default Home;

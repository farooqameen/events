import "./style.css";

const Nav = () => {
  return (
    <nav>
      <li>
        <h3 className="title">EventHero</h3>
      </li>
      <li className="join-button">
        <button>Join</button>
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
        <img src="/img/yps.png" alt="Youth Pioneer Society Logo" />
        <img src="/img/aubh.png" alt="American University of Bahrain Logo" />
        <img
          src="/img/mys.png"
          alt="Ministry of Youth and Sport Affairs Logo"
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

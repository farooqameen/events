import Nav from "./Nav";
import { event, user } from "./info";
import { Link } from "react-router-dom";

const EventContainer = (props) => {
  return (
    <div className="regular-container">
      <img src={props.event.image} alt="" className="event-img" />
      <div className="row-1">
        <h3 className="event-title">{props.event.title}</h3>
        <div className="event-type">{props.event.type}</div>
      </div>
      <div className="row-2">
        <div className="org-info">
          <img src={props.event.org.logo} alt="" />
          <h4>{props.event.org.name}</h4>
        </div>
        <div className="event-date">
          Starts: {props.event.date} at {props.event.time}
        </div>
      </div>
      <Link to={`/`}>
        <button className={props.class + "-button"}>{props.blabel}</button>
      </Link>
    </div>
  );
};

const Search = (props) => {
  return (
    <div className="input-group search">
      <label htmlFor="search" className="input-label">
        {props.label}
      </label>
      <i className="fa-solid fa-magnifying-glass"></i>
      <input type="search" name="search" id="search" className="input" />
    </div>
  );
};

const Browse = () => {
  return (
    <div>
      <Nav user={user} />
      <div className="breg-page">
        <Search />
        <div className="events">
          <EventContainer class="upcoming" blabel="Register" event={event} />
          <EventContainer class="upcoming" blabel="Register" event={event} />
          <EventContainer class="upcoming" blabel="Register" event={event} />
          <EventContainer class="upcoming" blabel="Register" event={event} />
        </div>
      </div>
    </div>
  );
};

export default Browse;
export { Search, EventContainer };

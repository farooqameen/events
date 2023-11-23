import { Link } from "react-router-dom";

const Event = (props) => {
  return (
    <div className={props.class}>
      <h2 className="section-title">{props.section} Events</h2>
      <div className={props.size + "-container"}>
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
        <Link to={`/info`}>
          <button className={props.class + "-button"}>{props.blabel}</button>
        </Link>
      </div>
    </div>
  );
};

export default Event;

import { event } from "./info";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShortInput = (props) => {
  return (
    <div className="input-group short">
      <label className="input-label" htmlFor={props.for}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.for}
        id={props.for}
        defaultValue={props.defaultValue}
        className="input"
      />
    </div>
  );
};

const Info = (props) => {
  return (
    <div className="card-info-container">
      <h2 className="card-info-title">{props.event.title}</h2>
      <div className="org-info">
        <img src={props.event.org.logo} alt="" />
        <h4>{props.event.org.name}</h4>
      </div>
      <div className="input-group">
        <label className="input-label" htmlFor="description">
          Description
        </label>
        <textarea
          className="input text-area"
          name="description"
          id="description"
          rows="10"
          cols="100"
          defaultValue={props.event.description}
        ></textarea>
      </div>
      <ShortInput
        for="date"
        label="Date"
        type="date"
        defaultValue={props.event.dateUTC}
      />
      <ShortInput
        for="starttime"
        label="Start Time"
        type="time"
        defaultValue={props.event.time}
      />
      <ShortInput
        for="endtime"
        label="End Time"
        type="time"
        defaultValue={props.event.endTime}
      />
      <ShortInput
        for="place"
        label="Venue"
        type="text"
        defaultValue={props.event.place}
      />
      <button className="event-det-but">Register</button>
    </div>
  );
};

const CardInfoOrg = () => {
  let det = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Info event={event} />
      {useEffect(() => {
        const handleClickOutside = (event) => {
          if (det.eventId && !event.target.closest(".event-details")) {
            navigate(-1);
          }
        };
        const delay = setTimeout(() => {
          document.addEventListener("click", handleClickOutside);
        }, 1);
        return () => {
          clearTimeout(delay);
          document.removeEventListener("click", handleClickOutside);
        };
      }, [navigate])}
    </>
  );
};

export default CardInfoOrg;

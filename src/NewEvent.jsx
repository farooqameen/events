import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Input = (props) => {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={props.for}>
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.for}
        id={props.for}
        className="input"
      />
    </div>
  );
};

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
        className="input"
      />
    </div>
  );
};

const Info = () => {
  return (
    <div className="card-info-container">
      <Input for="title" label="Title" type="text" />
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
        ></textarea>
      </div>
      <ShortInput for="date" label="Date" type="date" />
      <ShortInput for="starttime" label="Start Time" type="time" />
      <ShortInput for="endtime" label="End Time" type="time" />
      <ShortInput for="place" label="Venue" type="text" />
      <button className="event-det-but">Create Event</button>
    </div>
  );
};

const NewEvent = () => {
  let location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Info />
      {useEffect(() => {
        const handleClickOutside = (event) => {
          if (
            location.pathname.includes("new") &&
            !event.target.closest(".event-details")
          ) {
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

export default NewEvent;

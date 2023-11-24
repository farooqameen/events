import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

const TypeOptions = [
  { id: 1, value: "Event" },
  { id: 2, value: "Workshop" },
  { id: 3, value: "Course" },
];

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
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
      />
    </div>
  );
};

const OptionInput = (props) => {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={props.for}>
        {props.label}
      </label>
      <select
        name={props.for}
        id={props.for}
        className="input option"
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
      >
        <option value="" disabled hidden>
          Choose here
        </option>
        {props.options.map((option) => {
          return (
            <option value={option.value} key={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
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
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
      />
    </div>
  );
};

const Info = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const submitEvent = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const newEventRef = doc(collection(db, "events"));
      await setDoc(newEventRef, {
        id: newEventRef.id,
        organisation: user.uid,
        title: title,
        org: {
          logo: "/img/yps.png",
          name: "Youth Pioneer Society",
        },
        image: "/img/event-img.png",
        description: description,
        type: type,
        date: date,
        startTime: startTime,
        endTime: endTime,
        place: place,
      });
      navigate(-1);
    } catch {
      console.log("Something went wrong");
    }
  };
  return (
    <div className="card-info-container">
      <Input
        for="title"
        label="Title"
        type="text"
        value={title}
        setter={setTitle}
      />
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <OptionInput
        for="type"
        label="Type"
        value={type}
        setter={setType}
        options={TypeOptions}
      />
      <ShortInput
        for="date"
        label="Date"
        type="date"
        value={date}
        setter={setDate}
      />
      <ShortInput
        for="starttime"
        label="Start Time"
        type="time"
        value={startTime}
        setter={setStartTime}
      />
      <ShortInput
        for="endtime"
        label="End Time"
        type="time"
        value={endTime}
        setter={setEndTime}
      />
      <ShortInput
        for="place"
        label="Venue"
        type="text"
        value={place}
        setter={setPlace}
      />
      <button
        type="submit"
        className="event-det-but"
        onClick={(e) => submitEvent(e)}
      >
        Create Event
      </button>
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

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

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

const Info = (props) => {
  const [title, setTitle] = useState(props.event.title);
  const [description, setDescription] = useState(props.event.description);
  const [type, setType] = useState(props.event.type);
  const [date, setDate] = useState(props.event.date);
  const [startTime, setStartTime] = useState(props.event.startTime);
  const [endTime, setEndTime] = useState(props.event.endTime);
  const [place, setPlace] = useState(props.event.place);
  const navigate = useNavigate();

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const EventRef = doc(db, "events", props.event.id);
      await updateDoc(EventRef, {
        title: title,
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

  const deleteEvent = async (e) => {
    e.preventDefault();
    try {
      await deleteDoc(doc(db, "events", props.event.id));
      navigate(-1);
    } catch {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="card-info-container">
      <div className="event-det-options">
        <button
          className="event-det-but delete"
          onClick={(e) => deleteEvent(e)}
        >
          Delete
        </button>
        <button className="event-det-but part">View Participants</button>
      </div>
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
        onClick={(e) => saveChanges(e)}
      >
        Create Event
      </button>
    </div>
  );
};

const CardInfoOrg = () => {
  let det = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (det.eventId && !event.target.closest(".event-details")) {
        navigate(-1);
      }
    };
    const fetchEvents = async () => {
      const eventsQuery = query(
        collection(db, "events"),
        where("id", "==", det.eventId),
      );
      const eventsDoc = await getDocs(eventsQuery);
      const fetchedEvents = [];
      eventsDoc.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fetchedEvents.push(doc.data());
      });
      setEvent(fetchedEvents);
    };
    fetchEvents();
    const delay = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 1);
    return () => {
      clearTimeout(delay);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [navigate]);
  return <>{Object.keys(event).length > 0 && <Info event={event[0]} />}</>;
};

export default CardInfoOrg;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import CardInfoOrg from "./CardInfoOrg";

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
        value={props.value}
        className="input"
        readOnly
      />
    </div>
  );
};

const Info = (props) => {
  const navigate = useNavigate();

  const registerEvent = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const EventRef = doc(db, "events", props.event.id);
      await updateDoc(EventRef, {
        participants: arrayUnion(user.uid),
      });
      navigate(-1);
    } catch {
      console.log("Something went wrong");
    }
  };
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
          value={props.event.description}
          readOnly
        ></textarea>
      </div>
      <ShortInput
        for="date"
        label="Date"
        type="date"
        value={props.event.date}
      />
      <ShortInput
        for="starttime"
        label="Start Time"
        type="time"
        value={props.event.startTime}
      />
      <ShortInput
        for="endtime"
        label="End Time"
        type="time"
        value={props.event.endTime}
      />
      <ShortInput
        for="place"
        label="Venue"
        type="text"
        value={props.event.place}
      />
      <button className="event-det-but" onClick={(e) => registerEvent(e)}>
        Register
      </button>
    </div>
  );
};

const CardInfoUser = () => {
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

const CardInfo = () => {
  const [userDoc, setUserDoc] = useState({});
  const [uid, setUid] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid); // Set uid in state
        console.log(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  useEffect(() => {
    const getUser = async () => {
      const userDoc = (await getDoc(doc(db, "users", uid))).data();
      setUserDoc(userDoc);
    };
    if (uid) {
      getUser();
    }
  });
  return (
    <>
      {Object.keys(userDoc).length > 0 &&
        (userDoc.roles.includes("org") ? <CardInfoOrg /> : <CardInfoUser />)}
    </>
  );
};

export default CardInfo;

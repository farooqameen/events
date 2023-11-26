import Nav from "./Nav";
import { user } from "./info";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

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
          Starts: {props.event.date} at {props.event.startTime}
        </div>
      </div>
      <Link to={`${props.event.id}`}>
        <button className={props.class + "-button"}>{props.blabel}</button>
      </Link>
    </div>
  );
};

const Search = () => {
  return (
    <div className="input-group search">
      <label htmlFor="search" className="input-label">
        Search
      </label>
      <input type="text" name="search" id="search" className="input" />
    </div>
  );
};

const Browse = () => {
  let det = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [uid, setUid] = useState(null);
  const [user1, setUser] = useState({});

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
      setUser(userDoc);
    };
    if (uid) {
      getUser();
      if (Object.keys(user1).length > 0) {
        if (user1.roles.includes("org")) {
          navigate("/dashboard");
        }
      }
    }
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const upcomingEventQuery = query(
        collection(db, "events"),
        orderBy("date"),
      );
      const upcomingEventDoc = await getDocs(upcomingEventQuery);
      const fetchedEvents = [];
      upcomingEventDoc.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fetchedEvents.push(doc.data());
      });
      setEvents(fetchedEvents);
    };
    if (uid) {
      fetchEvents();
    }
  }, [uid, navigate]);
  return (
    <>
      <div className={`${det.eventId ? "blur" : ""}`}>
        <Nav user={user} />
        <div className="breg-page">
          <Search />
          <div className="events">
            {events.map((event) => (
              <EventContainer
                key={event.id}
                class="upcoming"
                size="regular"
                blabel="Register"
                event={event}
              />
            ))}
          </div>
        </div>
      </div>
      {det.eventId && (
        <div className="event-details">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Browse;
export { Search, EventContainer };

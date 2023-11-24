import {
  Link,
  NavLink,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { EventContainer, Search } from "./Browse";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Nav = () => {
  return (
    <nav>
      <li>
        <NavLink to={`/`} className="nav-link">
          <h1 className="title">EventHero</h1>
        </NavLink>
      </li>
      <div className="nav-items">
        <li>
          <NavLink to={"/org"} className="nav-link">
            <h2 className="nav-item">Dashboard</h2>
          </NavLink>
        </li>
      </div>
      <li>
        <Link to={`new`}>
          <button className="create-button">Create Event</button>
        </Link>
      </li>
    </nav>
  );
};

const OrgD = () => {
  let det = useParams();
  let location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [uid, setUid] = useState(null);

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
    const fetchEvents = async () => {
      const eventsQuery = query(
        collection(db, "events"),
        where("organisation", "==", uid),
      );
      const eventsDoc = await getDocs(eventsQuery);
      const fetchedEvents = [];
      eventsDoc.forEach((doc) => {
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
      <div
        className={`${
          det.eventId || location.pathname.includes("new") ? "blur" : ""
        }`}
      >
        <Nav />
        <div className="breg-page">
          <Search />
          <div className="events">
            {events.map((event) => (
              <EventContainer
                key={event.id}
                class="registered"
                size="regular"
                blabel="View Course"
                event={event}
              />
            ))}
          </div>
        </div>
      </div>
      {(det.eventId || location.pathname.includes("new")) && (
        <div className="event-details">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default OrgD;

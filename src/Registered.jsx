import Nav from "./Nav";
import { user } from "./info";
import { EventContainer, Search } from "./Browse";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const Registered = () => {
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
      const registeredEventQuery = query(
        collection(db, "events"),
        where("participants", "array-contains", uid),
        orderBy("date"),
      );
      const registeredEventDoc = await getDocs(registeredEventQuery);
      const fetchedEvents = [];
      registeredEventDoc.forEach((doc) => {
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
                class="registered"
                size="regular"
                blabel="View Course"
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

export default Registered;

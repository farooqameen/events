import Nav from "./Nav";
import Event from "./Event";
import "./style.css";
import { user } from "./info";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import OrgD from "./OrgD";

const DashboardUser = () => {
  let det = useParams();
  const navigate = useNavigate;
  const [featuredEvent, setFeaturedEvent] = useState({});
  const [registeredEvent, setRegisteredEvent] = useState({});
  const [upcomingEvent, setUpcomingEvent] = useState({});
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      const featuredEventQuery = query(
        collection(db, "events"),
        where("featured", "==", true),
        orderBy("date"),
        limit(1),
      );
      const featuredEventDoc = await getDocs(featuredEventQuery);
      let fetchedEvents = [];
      featuredEventDoc.forEach((doc) => {
        fetchedEvents.push(doc.data());
      });
      setFeaturedEvent(fetchedEvents);

      const registeredEventQuery = query(
        collection(db, "events"),
        where("participants", "array-contains", uid),
        orderBy("date"),
        limit(1),
      );
      const registedEventDoc = await getDocs(registeredEventQuery);
      fetchedEvents = [];
      registedEventDoc.forEach((doc) => {
        fetchedEvents.push(doc.data());
      });
      setRegisteredEvent(fetchedEvents);

      const upcomingEventQuery = query(
        collection(db, "events"),
        orderBy("date"),
        limit(1),
      );
      const upcomingEventDoc = await getDocs(upcomingEventQuery);
      fetchedEvents = [];
      upcomingEventDoc.forEach((doc) => {
        fetchedEvents.push(doc.data());
      });
      setUpcomingEvent(fetchedEvents);
    };
    if (uid) {
      fetchEvents();
    }
  }, [uid, navigate]);
  return (
    <>
      <div className={`${det.eventId ? "blur" : ""}`}>
        <Nav user={user} />
        <div className={`dashboard-page`}>
          {Object.keys(featuredEvent).length > 0 && (
            <Event
              class="feature"
              size="large"
              section="Featured"
              blabel="Register"
              event={featuredEvent[0]}
            />
          )}
          {Object.keys(registeredEvent).length > 0 && (
            <Event
              class="registered"
              size="regular"
              section="Registered"
              blabel="View Course"
              event={registeredEvent[0]}
            />
          )}
          {Object.keys(upcomingEvent).length > 0 && (
            <Event
              class="upcoming"
              size="regular"
              section="Browse"
              blabel="Register"
              event={upcomingEvent[0]}
            />
          )}
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

const Dashboard = () => {
  const [userDoc, setUserDoc] = useState({});
  const [uid, setUid] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
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
        (userDoc.roles.includes("org") ? <OrgD /> : <DashboardUser />)}
    </>
  );
};

export default Dashboard;

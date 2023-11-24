import {
  Link,
  NavLink,
  useParams,
  Outlet,
  useLocation,
} from "react-router-dom";
import { EventContainer, Search } from "./Browse";
import { event } from "./info";

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
  console.log(location);
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
            <EventContainer
              class="registered"
              size="regular"
              blabel="View Course"
              event={event}
            />
            <EventContainer
              class="registered"
              size="regular"
              blabel="View Course"
              event={event}
            />
            <EventContainer
              class="registered"
              size="regular"
              blabel="View Course"
              event={event}
            />
            <EventContainer
              class="registered"
              size="regular"
              blabel="View Course"
              event={event}
            />
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

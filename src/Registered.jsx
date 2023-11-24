import Nav from "./Nav";
import { event, user } from "./info";
import { EventContainer, Search } from "./Browse";
import { Outlet, useParams } from "react-router-dom";

const Registered = () => {
  let det = useParams();
  return (
    <>
      <div className={`${det.eventId ? "blur" : ""}`}>
        <Nav user={user} />
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
      {det.eventId && (
        <div className="event-details">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Registered;

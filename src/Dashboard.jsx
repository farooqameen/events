import Nav from "./Nav";
import Event from "./Event";
import "./style.css";
import { event, user } from "./info";
import { Outlet, useParams } from "react-router-dom";

const Dashboard = () => {
  let det = useParams();
  return (
    <>
      <div className={`${det.eventId ? "blur" : ""}`}>
        <Nav user={user} />
        <div className={`dashboard-page`}>
          <Event
            class="feature"
            size="large"
            section="Featured"
            blabel="Register"
            event={event}
          />
          <Event
            class="registered"
            size="regular"
            section="Registered"
            blabel="View Course"
            event={event}
          />
          <Event
            class="upcoming"
            size="regular"
            section="Browse"
            blabel="Register"
            event={event}
          />
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

export default Dashboard;

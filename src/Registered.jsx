import Nav from "./Nav";
import { event, user } from "./info";
import { EventContainer, Search } from "./Browse";

const Registered = () => {
  return (
    <div>
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
  );
};

export default Registered;

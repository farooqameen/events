import { event } from "./info";

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
      />
    </div>
  );
};

const Info = (props) => {
  return (
    <div className="card-info-container">
      <h2 className="card-info-title">{props.event.title}</h2>
      <div className="org-info">
        <img src={props.event.org.logo} alt="" />
        <h4>{props.event.org.name}</h4>
      </div>
      <textarea
        name="description"
        id="description"
        rows="10"
        cols="100"
        value={props.event.description}
      ></textarea>
      <ShortInput
        for="date"
        label="Date"
        type="date"
        value={props.event.dateUTC}
      />
      <ShortInput
        for="starttime"
        label="Start Time"
        type="time"
        value={props.event.time}
      />
      <ShortInput
        for="endtime"
        label="End Time"
        type="time"
        value={props.event.endTime}
      />
    </div>
  );
};

const CardInfo = () => {
  return <Info event={event} />;
};

export default CardInfo;

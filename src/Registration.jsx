import { Link } from "react-router-dom";

const GenderOptions = [
  { id: 1, value: "Male" },
  { id: 2, value: "Female" },
];

const EmploymentOptions = [
  { id: 1, value: "Employed" },
  { id: 2, value: "Unemployed" },
  { id: 3, value: "Student" },
];

const Nav = () => {
  return (
    <nav>
      <li>
        <Link to={`/`} style={{ textDecoration: "none" }}>
          <h1 className="title">EventHero</h1>
        </Link>
      </li>
    </nav>
  );
};

const Input = (props) => {
  return (
    <div className="input-group">
      <label htmlFor={props.for} className="input-label">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.for}
        id={props.for}
        className="input"
      />
    </div>
  );
};

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
        className="input"
      />
    </div>
  );
};

const OptionInput = (props) => {
  return (
    <div className="input-group">
      <label className="input-label" htmlFor={props.for}>
        {props.label}
      </label>
      <select name={props.for} id={props.for} className="input option">
        {props.options.map((option) => {
          return (
            <option value={option.value} key={option.id}>
              {option.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const SocialButton = (props) => {
  return (
    <button className={props.social.toLowerCase() + "-button"}>
      <img
        src={"/img/" + props.social.toLowerCase() + ".svg"}
        alt={props.social.toLowerCase() + " logo"}
        className={props.social.toLowerCase() + "-logo"}
      />
      Continue with {props.social}
    </button>
  );
};

const RegisterButton = (props) => {
  return <button className="register-button">{props.text}</button>;
};

const MainFrame = () => {
  return (
    <div className="register-container">
      <div className="sign-up">
        <h2 className="register-head">Sign-Up</h2>
        <div className="name">
          <ShortInput for="firstname" label="First Name" type="text" />
          <ShortInput for="lastname" label="Last Name" />
        </div>
        <OptionInput for="gender" label="Gender" options={GenderOptions} />
        <ShortInput for="birthday" label="Birthday" type="date" />
        <OptionInput
          for="employment"
          label="Employment"
          options={EmploymentOptions}
        />
        <Input for="email-signup" label="Email" type="email" />
        <Input for="password-signup" label="Password" type="password" />
        <RegisterButton text="Register" />
      </div>
      <div className="sign-in">
        <h2 className="register-head">Sign-In</h2>
        <div className="social-signin">
          <SocialButton social="Google" />
          <SocialButton social="Apple" />
        </div>
        <div className="divider"></div>
        <Input for="email-signin" label="Email" type="email" />
        <Input for="password-signin" label="Password" type="password" />
        <RegisterButton text="Sign-In" />
      </div>
    </div>
  );
};

const Registration = () => {
  return (
    <div className="register-page">
      <Nav />
      <MainFrame />
    </div>
  );
};

export default Registration;
export { Input, ShortInput, OptionInput, EmploymentOptions, GenderOptions };

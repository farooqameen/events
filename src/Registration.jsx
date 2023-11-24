import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";

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
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
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
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
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
      <select
        name={props.for}
        id={props.for}
        className="input option"
        value={props.value}
        onChange={(e) => props.setter(e.target.value)}
      >
        <option value="" disabled hidden>
          Choose here
        </option>
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
  return (
    <button
      type="submit"
      className="register-button"
      onClick={(e) => props.onClick(e)}
    >
      {props.text}
    </button>
  );
};

const MainFrame = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [employ, setEmploy] = useState("");
  const [emailUp, setEmailUp] = useState("");
  const [passwordUp, setPasswordUp] = useState("");
  const [emailIn, setEmailIn] = useState("");
  const [passwordIn, setPasswordIn] = useState("");

  const [notice, setNotice] = useState("");

  const signupWithUsernameAndPassword = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, emailUp, passwordUp);
      const user = auth.currentUser;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthday: birthday,
        employ: employ,
        email: user.email,
        roles: ["user"],
      });
      navigate("/register");
    } catch {
      setNotice("Sorry, something went wrong. Please try again.");
    }
  };

  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailIn, passwordIn);
      const userDoc = (
        await getDoc(doc(db, "users", auth.currentUser.uid))
      ).data();
      if (userDoc.roles.includes("org")) {
        navigate("/org");
      } else {
        navigate("/dashboard");
      }
    } catch {
      setNotice("You entered a wrong username or password.");
    }
  };

  return (
    <div className="register-container">
      <div className="sign-up">
        <h2 className="register-head">Sign-Up</h2>
        <div className="name">
          <ShortInput
            for="firstname"
            label="First Name"
            type="text"
            value={firstName}
            setter={setFirstName}
          />
          <ShortInput
            for="lastname"
            label="Last Name"
            value={lastName}
            setter={setLastName}
          />
        </div>
        <OptionInput
          for="gender"
          label="Gender"
          options={GenderOptions}
          value={gender}
          setter={setGender}
        />
        <ShortInput
          for="birthday"
          label="Birthday"
          type="date"
          value={birthday}
          setter={setBirthday}
        />
        <OptionInput
          for="employment"
          label="Employment"
          options={EmploymentOptions}
          value={employ}
          setter={setEmploy}
        />
        <Input
          for="email-signup"
          label="Email"
          type="email"
          value={emailUp}
          setter={setEmailUp}
        />
        <Input
          for="password-signup"
          label="Password"
          type="password"
          value={passwordUp}
          setter={setPasswordUp}
        />
        <RegisterButton
          text="Register"
          onClick={signupWithUsernameAndPassword}
        />
      </div>
      <div className="sign-in">
        <h2 className="register-head">Sign-In</h2>
        <div className="social-signin">
          <SocialButton social="Google" />
          <SocialButton social="Apple" />
        </div>
        <div className="divider"></div>
        <Input
          for="email-signin"
          label="Email"
          type="email"
          value={emailIn}
          setter={setEmailIn}
        />
        <Input
          for="password-signin"
          label="Password"
          type="password"
          value={passwordIn}
          setter={setPasswordIn}
        />
        <RegisterButton text="Sign-In" onClick={loginWithEmailAndPassword} />
      </div>
      {notice != "" && <p>{notice}</p>}
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

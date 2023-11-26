import Nav from "./Nav";
import { Nav as NavOrg } from "./OrgD";
import { user } from "./info";
import {
  ShortInput,
  OptionInput,
  EmploymentOptions,
  GenderOptions,
} from "./Registration";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

const InformationUser = (props) => {
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [gender, setGender] = useState(props.user.gender);
  const [birthday, setBirthday] = useState(props.user.birthday);
  const [employ, setEmploy] = useState(props.user.employ);

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const EventRef = doc(db, "users", props.user.uid);
      await updateDoc(EventRef, {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthday: birthday,
        employ: employ,
      });
    } catch {
      console.log("Something went wrong");
    }
  };
  return (
    <div className="acc-info">
      <h2 className="info-head">Account Information</h2>
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
      <button className="save-button" onClick={(e) => saveChanges(e)}>
        Save Information
      </button>
    </div>
  );
};

const InformationOrg = (props) => {
  const [name, setName] = useState(props.user.name);

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      const EventRef = doc(db, "users", props.user.uid);
      await updateDoc(EventRef, {
        name: name,
      });
    } catch {
      console.log("Something went wrong");
    }
  };
  return (
    <div className="acc-info">
      <h2 className="info-head">Account Information</h2>
      <ShortInput
        for="Name"
        label="Name"
        type="text"
        value={name}
        setter={setName}
      />
      <button className="save-button" onClick={(e) => saveChanges(e)}>
        Save Information
      </button>
    </div>
  );
};

const Profile = () => {
  const [user1, setUser] = useState({});
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();
  const logOutUser = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid); // Set uid in state
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
    }
  });
  return (
    <>
      {Object.keys(user1).length > 0 &&
        (user1.roles.includes("org") ? (
          <div className="profile-page">
            <NavOrg />
            <InformationOrg user={user1} />
            <button
              type="button"
              className="event-det-but delete"
              onClick={logOutUser}
            >
              Signout
            </button>
          </div>
        ) : (
          <div className="profile-page">
            <Nav user={user} />
            <InformationUser user={user1} />
            <button
              type="button"
              className="event-det-but delete"
              onClick={logOutUser}
            >
              Signout
            </button>
          </div>
        ))}
    </>
  );
};

export default Profile;

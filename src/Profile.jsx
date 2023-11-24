import Nav from "./Nav";
import { user } from "./info";
import {
  ShortInput,
  OptionInput,
  EmploymentOptions,
  GenderOptions,
} from "./Registration";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Information = (props) => {
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

const Profile = () => {
  const [user1, setUser] = useState({});
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();

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
    const fetchEvents = async () => {
      const eventsQuery = query(
        collection(db, "users"),
        where("uid", "==", uid),
      );
      const eventsDoc = await getDocs(eventsQuery);
      const fetchedEvents = [];
      eventsDoc.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        fetchedEvents.push(doc.data());
      });
      setUser(fetchedEvents);
      console.log(user1);
    };
    fetchEvents();
  });
  return (
    <div className="profile-page">
      <Nav user={user} />
      {Object.keys(user1).length > 0 && <Information user={user1[0]} />}
    </div>
  );
};

export default Profile;

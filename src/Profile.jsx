import Nav from "./Nav";
import { user } from "./info";
import {
  Input,
  ShortInput,
  OptionInput,
  EmploymentOptions,
  GenderOptions,
} from "./Registration";

const Information = () => {
  return (
    <div className="acc-info">
      <h2 className="info-head">Account Information</h2>
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
      <button className="save-button">Save Information</button>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="profile-page">
      <Nav user={user} />
      <Information />
    </div>
  );
};

export default Profile;

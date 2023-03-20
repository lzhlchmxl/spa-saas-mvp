import * as T from "../../utilities/types";

export default function ViewProfile(prop: {profile: T.ClientProfile}) {

  const {firstName, lastName, homeAddress, emailAddress, dateOfBirth, phoneNumber} = prop.profile;

  return (
    <div className="flex flex-col capitalize">
      <p>{firstName}'s Profile</p>
      <p >First Name: {firstName}</p>
      <p >Last Name: {lastName}</p>
      <p>Home Address: {homeAddress}</p>
      <p>Email Address: {emailAddress}</p>
      <p>date of birth: {dateOfBirth.toString()}</p>
      <p>Phone Number: {phoneNumber}</p>
    </div>
  )
}
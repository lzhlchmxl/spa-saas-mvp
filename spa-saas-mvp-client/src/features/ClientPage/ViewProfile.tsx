import * as T from "../../utilities/types";

export default function ViewProfile(prop: {profile: T.ClientProfile}) {

  const {firstName, lastName, homeAddress, emailAddress, dateOfBirth, phoneNumber} = prop.profile;

  return (
    <div className="flex flex-col text-lg self-center text-textsIcons font-semibold">
      <p className="text-2xl"> {firstName}'s Profile </p>
      <div className="flex flex-col bg-backgrounds rounded-lg p-4 my-4">
        <p className="my-3 ">First Name: {firstName}</p>
        <p className="my-3">Last Name: {lastName}</p>
        <p className="my-3 ">Home Address: {homeAddress}</p>
        <p className="my-3">Email Address: {emailAddress}</p>
        <p className="my-3 ">Date of Birth: {dateOfBirth.toString()}</p>
        <p className="my-3 ">Phone Number: {phoneNumber}</p>
      </div>
    </div>
  )
}
import * as T from "../../utilities/types";

export default function ViewProfile(prop: {profile: T.VendorProfile}) {

  const {firstName, lastName, businessName, businessAddress, emailAddress, serviceCategories, phoneNumber} = prop.profile;

  const servicesHTML = <ul>{serviceCategories.map( serviceCategory => {
      return <li>{serviceCategory.name}</li>
    })
  }</ul>

  return (
    <div className="flex flex-col capitalize">
      <p>{firstName}'s Profile</p>
      <p >First Name: {firstName}</p>
      <p >Last Name: {lastName}</p>
      <p>Business Name: {businessName}</p>
      <p>Business Address: {businessAddress}</p>
      <p>Email Address: {emailAddress}</p>
      <p>Phone Number: {phoneNumber}</p>
      {servicesHTML}
    </div>
  )
}
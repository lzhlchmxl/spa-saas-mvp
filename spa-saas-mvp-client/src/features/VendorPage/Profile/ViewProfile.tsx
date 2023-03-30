import * as T from "../../../utilities/types";

export default function ViewProfile(prop: {profile: T.VendorProfile}) {

  const {firstName, lastName, businessName, businessAddress, emailAddress, serviceCategories, phoneNumber} = prop.profile;

  const servicesHTML = <ul>{serviceCategories.map( serviceCategory => {
      return <li>{serviceCategory.name}</li>
    })
  }</ul>

  return (
    <div className="flex flex-col text-lg text-textsIcons w-fit">
      <p className="text-3xl font-semibold">{firstName}'s Profile</p>
      <div className="flex flex-col rounded-lg my-4">
        <p className="my-3">First Name: {firstName}</p>
        <p className="my-3">Last Name: {lastName}</p>
        <p className="my-3">Business Name: {businessName}</p>
        <p className="my-3">Business Address: {businessAddress}</p>
        <p className="my-3">Email Address: {emailAddress}</p>
        <p className="my-3">Phone Number: {phoneNumber}</p>
        {servicesHTML}
      </div>
    </div>
  )
}
import * as T from "../../../utilities/types";

export default function ViewMySpa({ mySpa }: {mySpa: T.NewSpa}) {

  const {name, description, vendorServices} = mySpa;

  const servicesHTML = <ul>{vendorServices.map( service => {
      return <li>{service.name}</li>
    })
  }</ul>

  return (
    <div className="flex flex-col capitalize">
      <p>{name}</p>
      <p>{description}</p>
      {servicesHTML}
    </div>
  )
}
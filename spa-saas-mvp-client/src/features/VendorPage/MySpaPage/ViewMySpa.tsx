import * as T from "../../../utilities/types";

export default function ViewMySpa({ mySpa }: {mySpa: T.NewSpa}) {

  const {name, description} = mySpa;

  return (
    <div className="flex flex-col capitalize">
      <p>{name}</p>
      <p>{description}</p>
    </div>
  )
}
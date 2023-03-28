import * as T from "../../../utilities/types";

export default function ViewMySpa({ mySpa }: {mySpa: T.NewSpa}) {

  const {name, description} = mySpa;

  return (
    <div className="flex flex-col capitalize p-6 text-textsIcons self-center">
      <p className="text-3xl font-bold">{name}</p>
      <p className="text-lg my-4">{description}</p>
    </div>
  )
}
import * as T from "../../../utilities/types";
import { durationToSeconds, secondsToDuration } from "../../../utilities/utilityFunctions";

export default function ViewVendorServiceDetails({ name, description, cost, durationInSeconds }: T.VendorService) {

  const duration = secondsToDuration(durationInSeconds);

  return (
    <div className="flex border border-b-black/50 justify-around">
      <p>{name}</p>
      <p>{description}</p>
      <p>{cost}</p>
      <p>{duration.hours}h {duration.minutes}m</p>
    </div>
  )
}
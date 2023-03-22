import ErrorIndicator from "../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../app/UIComponents/LoadingIndicator";
import { getSpaDetailsById } from "../../utilities/api";
import { useAsync, useRequiredParams } from "../../utilities/customHooks";
import { secondsToDuration } from "../../utilities/utilityFunctions";

export default function ViewSpaDetails() {

  const vendorSpaId = useRequiredParams('vendorSpaId');

  const spaDetailsAsync = useAsync(() => getSpaDetailsById(vendorSpaId), []);

  if (spaDetailsAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (spaDetailsAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const spaDetails = spaDetailsAsync.value;

  const serviceHTML = spaDetails.services.map(service => {

    const duration = secondsToDuration(service.durationInSeconds);

    return (
      <div className="flex flex-col">
        <p>Name: {service.name}</p>
        <p>Description: {service.description}</p>
        <p>Cost Per Session: {service.cost}</p>
        <p>Duration: {duration.hours}h {duration.minutes}m</p>
      </div>
    )
  })


  return (
    <div className="flex flex-col">
      <p>{spaDetails.name}</p>
      <p>{spaDetails.description}</p>
      {serviceHTML}
    </div>
  )
}
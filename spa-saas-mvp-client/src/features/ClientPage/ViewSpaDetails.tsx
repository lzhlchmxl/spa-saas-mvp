import Button from "../../app/UIComponents/Button";
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

  const handleBookService = (serviceId: string) => {
    window.alert("Feature under constructions.");
  }

  const serviceHTML = spaDetails.services.map((service) => {
    const duration = secondsToDuration(service.durationInSeconds);
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md my-4 relative">
        <div className="absolute top-4 right-4">
        <Button 
          actionType="primary"
          actionText="Book Service" 
          actionHandler={() => handleBookService(service._id)}        
        />
        </div>
        <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
        <p className="text-gray-700 mb-2">{service.description}</p>
        <p className="text-accent font-bold text-lg mb-2">
          Cost Per Session: {service.cost}
        </p>
        <p className="text-primary font-bold mb-2">
          Duration: {duration.hours}h {duration.minutes}m
        </p>
      </div>
    );
  });
  
  return (
    <div className=" w-full flex justify-center items-center">
      <div className="bg-backgrounds p-4 rounded-lg shadow-md w-[90%] h-[90%]">
        <h1 className="text-3xl font-bold text-accent mb-2">
          {spaDetails.name}
        </h1>
        <p className="text-gray-700 mb-2">{spaDetails.description}</p>
        {serviceHTML}
      </div>
    </div>
  );
}
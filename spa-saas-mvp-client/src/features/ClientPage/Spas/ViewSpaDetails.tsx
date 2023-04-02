import Button from "../../../app/UIComponents/Button";
import ContentPageTopButtons from "../../../app/UIComponents/ContentPageTopButtons";
import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../../app/UIComponents/LoadingIndicator";
import { getSpaDetailsById } from "../../../utilities/api";
import { useAsync, useRequiredParams } from "../../../utilities/customHooks";
import { secondsToDuration } from "../../../utilities/utilityFunctions";

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
    
  }

  const handleBookNextAvailableService = (serviceId: string) => {
    window.alert("Under construction.");
  }

  const serviceHTML = spaDetails.services.map((service) => {
    const duration = secondsToDuration(service.durationInSeconds);
  
    return (
      <div className="p-5 rounded-lg shadow-lg my-5 relative border border-white/50">
        <div className="absolute top-4 right-4">
        <Button 
          actionType="primary"
          actionText="Book Service" 
          actionHandler={() => handleBookService(service._id)}        
        />
        <Button 
          actionType="secondary"
          actionText="Book Next Available" 
          actionHandler={() => handleBookNextAvailableService(service._id)}        
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
    <div className="relative flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center text-textsIcons">
      <ContentPageTopButtons 
        hideEditDeleteButtons={true}
        editCallback={() => {}} 
        deleteCallback={() => {}} 
      />
      <div className="bg-lightBackgrounds w-full mt-10">
        <h1 className="text-3xl font-bold text-accent mb-2">
          {spaDetails.name}
        </h1>
        <p className="text-gray-700 mb-2">{spaDetails.description}</p>
        {serviceHTML}
      </div>
    </div>
  );
}
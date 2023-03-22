import Button from "../../../app/UIComponents/Button";
import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../../app/UIComponents/LoadingIndicator";
import { deleteMyServiceById, getMyServiceDetails, getMyServiceHeaders } from "../../../utilities/api";
import { useAsync, useRequiredParams } from "../../../utilities/customHooks";
import { secondsToDuration } from "../../../utilities/utilityFunctions";

export default function ViewVendorServiceDetails() {

  const vendorServiceId = useRequiredParams('vendorServiceId')

  const myServiceHeadersAsync = useAsync(() => getMyServiceHeaders(), []);
  const myServiceDetailsAsync = useAsync(() => getMyServiceDetails(vendorServiceId), []);
  
  if ( myServiceDetailsAsync.status === "pending" || myServiceHeadersAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( myServiceDetailsAsync.status === "rejected" || myServiceHeadersAsync.status === "rejected") {
    return <ErrorIndicator />;
  }

  const myServiceDetails = myServiceDetailsAsync.value;
  const myServiceHeaders = myServiceHeadersAsync.value;

  const categoryName = myServiceHeaders.find( myServiceHeader => myServiceHeader._id === myServiceDetails.categoryId)?.name;
  
  const duration = secondsToDuration(myServiceDetails.durationInSeconds);

  const handleEditServiceDetails = () => {
    window.location.pathname = `/vendor/my-services/edit/${vendorServiceId}`
  }

  const handleDeleteVendorService = async () => {
    const httpStatusCode = await deleteMyServiceById(vendorServiceId);

    if (httpStatusCode !== 200) {
      window.alert('Deletion unsuccessful. Redirecting...');
    } else {
      window.alert('Deletion successful. Redirecting...');
    }

    window.location.pathname = `/vendor/my-services`
  }

  return (
    <div className="flex border border-b-black/50 justify-around">
      <div className="flex flex-col">
        <p>Category: {categoryName}</p>
        <p>Name: {myServiceDetails.name}</p>
        <p>Description: {myServiceDetails.description}</p>
        <p>Cost Per Session: {myServiceDetails.cost}</p>
        <p>Duration: {duration.hours}h {duration.minutes}m</p>
      </div>
      <div className="flex h-[50px]">
        <Button 
          actionType="secondary"
          actionText="EDIT"
          actionHandler={handleEditServiceDetails}        
        />
        <Button 
          actionType="danger"
          actionText="DELETE"
          actionHandler={handleDeleteVendorService}        
        />
      </div>
    </div>
  )
}
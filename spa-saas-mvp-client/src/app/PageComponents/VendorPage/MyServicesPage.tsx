import { Outlet } from "react-router-dom";
import { getMyServiceHeaders } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import { secondsToDuration } from "../../../utilities/utilityFunctions";
import Button from "../../UIComponents/Button";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";
import * as T from '../../../utilities/types';

export default function MyServicesPage() {

  const myServiceHeadersAsync = useAsync(() => getMyServiceHeaders(), []);

  if ( myServiceHeadersAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( myServiceHeadersAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const myServiceHeaders = myServiceHeadersAsync.value;

  const myServiceHeadersHTML = myServiceHeaders.map( myServiceHeader => {
    const duration = secondsToDuration(myServiceHeader.durationInSeconds);
    return (
      <div
        onClick={ () => handleViewServiceDetails(myServiceHeader._id)}
        key={myServiceHeader._id}
        className="flex border border-b-black/50 justify-around hover:cursor-pointer"
      >
        <p>{myServiceHeader.name}</p>
        <p>{myServiceHeader.cost}</p>
        <p>{duration.hours}h {duration.minutes}m</p>
      </div>
    )
  })

  const handleCreateMyService = () => {
    window.location.pathname = '/vendor/my-services/create'
  }

  const handleViewServiceDetails = (vendorServiceId: T.VendorServiceId) => {
    window.location.pathname = `/vendor/my-services/${vendorServiceId}`
  }

  const showCreateButton = window.location.pathname === '/vendor/my-services';

  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className={showCreateButton ? "flex" : "hidden"}>
          <Button 
            actionType={"primary"} 
            actionText="New Service"
            actionHandler={handleCreateMyService}      
          />
        </div>
        {myServiceHeadersHTML}
      </div>
      <Outlet />
    </div>
  )

}
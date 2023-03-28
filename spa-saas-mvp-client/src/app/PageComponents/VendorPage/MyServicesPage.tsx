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
        className="flex border border-borders hover:bg-highlight transition-colors duration-200 cursor-pointer"
      >
        <p className="w-1/2 p-4 text-textsIcons font-medium">{myServiceHeader.name}</p>
        <p className="w-1/2 p-4 text-textsIcons">{myServiceHeader.cost}</p>
        <p className="w-1/2 p-4 text-textsIcons">{duration.hours}h {duration.minutes}m</p>
      </div>
    )
  })

  const handleCreateMyService = () => {
    window.location.pathname = '/vendor/my-services/create'
  }

  const handleViewServiceDetails = (vendorServiceId: T.VendorServiceId) => {
    window.location.pathname = `/vendor/my-services/${vendorServiceId}`
  }

  return (
    <div className="flex w-full">
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex flex-col w-[80%]">
          <div className="flex self-end">
            <Button 
              actionType="primary" 
              actionText="New Service"
              actionHandler={handleCreateMyService}      
            />
          </div>
          <div className="flex border border-borders font-medium bg-backgrounds">
            <p className="w-1/3 p-4 text-textsIcons">Name</p>
            <p className="w-1/3 p-4 text-textsIcons">Cost Per Session</p>
            <p className="w-1/3 p-4 text-textsIcons">Duration</p>
          </div>
          {myServiceHeadersHTML}
        </div>
      </div>
      <Outlet />
    </div>
  )

}
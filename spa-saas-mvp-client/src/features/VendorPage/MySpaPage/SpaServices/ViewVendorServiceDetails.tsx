import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import ContentPageTopButtons from "../../../../app/UIComponents/ContentPageTopButtons";
import ErrorIndicator from "../../../../app/UIComponents/ErrorIndicator";
import IconButton from "../../../../app/UIComponents/IconButton";
import LoadingIndicator from "../../../../app/UIComponents/LoadingIndicator";
import { deleteSpaServiceById, getSpaServiceDetails } from "../../../../utilities/api";
import { useAsync, useRequiredParams } from "../../../../utilities/customHooks";
import { secondsToDuration } from "../../../../utilities/utilityFunctions";

export default function ViewVendorServiceDetails() {

  const navigate = useNavigate();
  const vendorServiceId = useRequiredParams('vendorServiceId')

  // [TODO] commented code is for the admin "service category" feature
  // const myServiceHeadersAsync = useAsync(() => getSpaServiceHeaders(), []);
  const spaServiceDetailsAsync = useAsync(() => getSpaServiceDetails(vendorServiceId), [vendorServiceId]);
  
  if ( spaServiceDetailsAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( spaServiceDetailsAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const spaServiceDetails = spaServiceDetailsAsync.value;
  // const myServiceHeaders = myServiceHeadersAsync.value;

  // const categoryName = myServiceHeaders.find( myServiceHeader => myServiceHeader._id === myServiceDetails.categoryId)?.name;
  
  const duration = secondsToDuration(spaServiceDetails.durationInSeconds);

  const handleEditServiceDetails = () => {
    navigate(`/vendor/my-spa/services/${vendorServiceId}/edit`);
  }

  const handleDeleteVendorService = async () => {
    const httpStatusCode = await deleteSpaServiceById(vendorServiceId);

    if (httpStatusCode === 200) {
      window.location.href = '/vendor/my-spa#services';
    } else {
      return (<ErrorIndicator />);
    }
  }

  const handleViewSpaResourceDetails = (resourceId: string) => {
    navigate(`/vendor/my-spa/resources/${resourceId}`)
  }
  
  const handleEditSpaResourceDetails = (resourceId: string) => {
    navigate(`/vendor/my-spa/resources/${resourceId}/edit`)
  }


  const spaResourcesHTML = spaServiceDetails.requiredSpaResources.map( ({spaResource, requiredCount} , index) => {
    return (
      <div 
        key={spaResource._id} 
        className="group capitalize flex h-[50px] hover:bg-textsIcons/5 items-center rounded-sm hover:cursor-pointer mb-1"
        onClick={() => handleViewSpaResourceDetails(spaResource._id)}
      >
        <p className="w-1/6 pl-[15px]">{index + 1}</p>
        <div className="w-1/6">{spaResource.type}</div>
        <p className="w-1/3">{spaResource.name}</p>
        <p className="w-1/6 text-center">{requiredCount}</p>
        <div className="hidden group-hover:flex w-1/12">
          <div className="flex w-[30px] h-[30px] justify-center items-center hover:bg-textsIcons/10 rounded-md">
            <IconButton icon={faPenToSquare} actionCallback={() => handleEditSpaResourceDetails(spaResource._id)} />
          </div>
        </div>
      </div>  
    )
  });


  return (
    <div className="flex flex-col h-full bg-lightBackgrounds w-[80%]">
      <ContentPageTopButtons 
        backButtonTargetLocation="/vendor/my-spa#services"
        editCallback={handleEditServiceDetails}
        deleteCallback={handleDeleteVendorService}
      />
      <div className="text-textsIcons">
        <div className="my-5 flex flex-col w-full">
          <h1 className="text-3xl font-semibold">{spaServiceDetails.name}</h1>
          <p className="mt-3 text-textsIcons/50">{spaServiceDetails.description}</p>
        </div>
        {/* <p className="font-semibold">Category: {categoryName}</p> */}
        <p className="mt-3 font-semibold text-lg capitalize">cost per session: </p>
        <p className="mt-1 text-textsIcons/70">${spaServiceDetails.cost}</p>
        <p className="mt-3 font-semibold text-lg capitalize">duration: </p>
        <p className="mt-1 text-textsIcons/70">{duration.hours} hour{duration.hours > 1 ? "s" : ""} {duration.minutes} minute{duration.minutes > 1 ? "s" : ""}</p>
        <h1 className="mt-3 font-semibold text-lg capitalize">required resources:</h1>
        <div className="flex flex-col mt-1">
          <div className="flex mb-1">
            <p className="w-1/6">Index</p>
            <p className="w-1/6">Type</p>
            <p className="w-1/3">Name</p>
            <p className="w-1/6"># Required</p>
            <p className="w-1/12"></p>
          </div>
          {spaResourcesHTML}
        </div>
      </div>   
    </div>
  )
}
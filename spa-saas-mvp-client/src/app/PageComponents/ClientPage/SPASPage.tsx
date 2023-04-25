import { getVendorSpaHeaders } from "../../../utilities/api"
import { useAsync } from "../../../utilities/customHooks"
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";
import * as T from "../../../utilities/types";
import ContentPageTopButtons from "../../UIComponents/ContentPageTopButtons";

export default function SpasPage() {

  const vendorSpaHeadersAsync = useAsync(getVendorSpaHeaders, []);

  if (vendorSpaHeadersAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (vendorSpaHeadersAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const vendorSpaHeaders = vendorSpaHeadersAsync.value;

  const handleViewSpaDetails = (spaId: T.spaId) => {
    window.location.pathname = `/client/spas/${spaId}`
  }
  
  const vendorSpaHeadersHTML = vendorSpaHeaders.map(vendorSpaHeader => {
    return (
      <div
        onClick={() => handleViewSpaDetails(vendorSpaHeader.spaId)}
        key={vendorSpaHeader.spaId}
        className="flex border border-borders hover:bg-textsIcons/5 transition-colors duration-200 cursor-pointer"
      >
        <p className="w-1/2 p-4 text-textsIcons font-medium">{vendorSpaHeader.name}</p>
        <p className="w-1/2 p-4 text-textsIcons">{vendorSpaHeader.description}</p>
      </div>
    );
  });
  
  return (
    <div className="relative flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center">
      <ContentPageTopButtons 
        hideEditDeleteButtons={true}
        editCallback={() => {}} 
        deleteCallback={() => {}} 
      />
      <div className="flex flex-col w-full mt-10">
        <div className="flex border border-borders font-medium bg-backgrounds">
          <p className="w-1/2 p-4 text-textsIcons">Name</p>
          <p className="w-1/2 p-4 text-textsIcons">Description</p>
        </div>
        {vendorSpaHeadersHTML}
      </div>
    </div>
  );

}
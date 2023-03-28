import { getVendorSpaHeaders } from "../../../utilities/api"
import { useAsync } from "../../../utilities/customHooks"
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";
import * as T from "../../../utilities/types";

export default function SpasPage() {

  const vendorSpaHeadersAsync = useAsync(getVendorSpaHeaders, []);

  if (vendorSpaHeadersAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (vendorSpaHeadersAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const vendorSpaHeaders = vendorSpaHeadersAsync.value;

  const handleViewSpaDetails = (vendorSpaId: T.VendorSpaId) => {
    window.location.pathname = `/client/spas/${vendorSpaId}`
  }
  
  const vendorSpaHeadersHTML = vendorSpaHeaders.map(vendorSpaHeader => {
    return (
      <div
        onClick={() => handleViewSpaDetails(vendorSpaHeader.vendorSpaId)}
        key={vendorSpaHeader.vendorSpaId}
        className="flex border border-borders hover:bg-highlight transition-colors duration-200 cursor-pointer"
      >
        <p className="w-1/2 p-4 text-textsIcons font-medium">{vendorSpaHeader.name}</p>
        <p className="w-1/2 p-4 text-textsIcons">{vendorSpaHeader.description}</p>
      </div>
    );
  });
  
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col w-[80%]">
        <div className="flex border border-borders font-medium bg-backgrounds">
          <p className="w-1/2 p-4 text-textsIcons">Name</p>
          <p className="w-1/2 p-4 text-textsIcons">Description</p>
        </div>
        {vendorSpaHeadersHTML}
      </div>
    </div>
  );

}
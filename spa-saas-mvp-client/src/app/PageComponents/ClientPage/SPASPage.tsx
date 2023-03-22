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
  
  const vendorSpaHeadersHTML = vendorSpaHeaders.map( vendorSpaHeader => {
    return (
      <div
        onClick={() => handleViewSpaDetails(vendorSpaHeader.vendorSpaId)}
        key={vendorSpaHeader.vendorSpaId}
        className="flex border border-b-black/50 justify-between"
      >
        <p>{vendorSpaHeader.name}</p>
        <p>{vendorSpaHeader.description}</p>
      </div>
    )
  })

  return (
    <div className="flex flex-col">
      <div
        className="flex border border-b-black/50 justify-between"
      >
        <p>Name</p>
        <p>Description</p>
      </div>
      {vendorSpaHeadersHTML}
    </div>
  )

}
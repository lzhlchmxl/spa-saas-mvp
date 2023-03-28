import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../../app/UIComponents/LoadingIndicator";
import VendorServiceForm from "../../../app/UIComponents/VendorServiceForm";
import { getMyServiceDetails, updateMyServiceById } from "../../../utilities/api";
import { useAsync, useRequiredParams } from "../../../utilities/customHooks";
import * as T from "../../../utilities/types";


export default function EditVendorServiceDetails() {

  const vendorServiceId = useRequiredParams('vendorServiceId')

  const myServiceDetailsAsync = useAsync(() => getMyServiceDetails(vendorServiceId), []);
  
  if ( myServiceDetailsAsync.status === "pending") {
    return <LoadingIndicator />;
  }

  if ( myServiceDetailsAsync.status === "rejected") {
    return <ErrorIndicator />;
  }

  const myServiceDetails = myServiceDetailsAsync.value;

  const initialForm: T.VendorServiceForm = myServiceDetails;

  const handleEditServiceDetails = async (updatedVendorServiceForm: T.VendorServiceForm) => {
    
    const updatedVendorService: T.VendorService = {
      ...updatedVendorServiceForm,
      _id: vendorServiceId,
    }
    
    const httpStatusCode = await updateMyServiceById(updatedVendorService);
    if (httpStatusCode === 200) {
      window.location.href = `/vendor/my-services/${vendorServiceId}`;
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <div className="flex justify-around">
      <VendorServiceForm 
        initialForm={initialForm} 
        cancelText="CANCEL"
        cancelLink={`/vendor/my-services/${vendorServiceId}`}
        actionText="SAVE" 
        actionCallback={handleEditServiceDetails}      
      />
    </div>
  )
}
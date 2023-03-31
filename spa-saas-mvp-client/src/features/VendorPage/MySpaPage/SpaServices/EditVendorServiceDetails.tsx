import ErrorIndicator from "../../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../../app/UIComponents/Form";
import LoadingIndicator from "../../../../app/UIComponents/LoadingIndicator";
import { getSpaServiceDetails, updateSpaServiceById } from "../../../../utilities/api";
import { useAsync, useRequiredParams } from "../../../../utilities/customHooks";
import * as T from "../../../../utilities/types";


export default function EditVendorServiceDetails() {

  const vendorServiceId = useRequiredParams('vendorServiceId')

  const myServiceDetailsAsync = useAsync(() => getSpaServiceDetails(vendorServiceId), []);
  
  if ( myServiceDetailsAsync.status === "pending") {
    return <LoadingIndicator />;
  }

  if ( myServiceDetailsAsync.status === "rejected") {
    return <ErrorIndicator />;
  }

  const myServiceDetails = myServiceDetailsAsync.value;

  const handleEditServiceDetails = async (updatedVendorServiceForm: FormState) => {
    
    const updatedVendorService: T.VendorService = {
      _id: vendorServiceId,
      categoryId: updatedVendorServiceForm['categoryId'] as string,
      name: updatedVendorServiceForm['name'] as string, 
      description: updatedVendorServiceForm['description'] as string, 
      cost: updatedVendorServiceForm['cost'] as string,
      durationInSeconds: updatedVendorServiceForm['durationInSeconds'] as number,

    }
    
    const httpStatusCode = await updateSpaServiceById(updatedVendorService);
    if (httpStatusCode === 200) {
      window.location.href = `/vendor/my-spa/services/${vendorServiceId}`;
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <div className="flex justify-around">
      <Form 
        initialForm={myServiceDetails} 
        formName="vendorSpaServiceForm"
        cancelText="Cancel"
        cancelLink={`/vendor/my-spa#services`}
        actionText="Save"
        actionCallback={handleEditServiceDetails}      
      />
    </div>
  )
}
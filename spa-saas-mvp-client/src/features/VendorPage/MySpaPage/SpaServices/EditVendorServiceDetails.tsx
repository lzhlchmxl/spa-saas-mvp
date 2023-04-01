import ContentPageTopButtons from "../../../../app/UIComponents/ContentPageTopButtons";
import ErrorIndicator from "../../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../../app/UIComponents/Form";
import LoadingIndicator from "../../../../app/UIComponents/LoadingIndicator";
import { getSpaServiceDetails, updateSpaServiceById } from "../../../../utilities/api";
import { useAsync, useRequiredParams } from "../../../../utilities/customHooks";
import * as T from "../../../../utilities/types";


export default function EditVendorServiceDetails() {

  const vendorServiceId = useRequiredParams('vendorServiceId')

  const spaServiceDetailsAsync = useAsync(() => getSpaServiceDetails(vendorServiceId), []);
  
  if ( spaServiceDetailsAsync.status === "pending") {
    return <LoadingIndicator />;
  }

  if ( spaServiceDetailsAsync.status === "rejected") {
    return <ErrorIndicator />;
  }

  const spaServiceDetails = spaServiceDetailsAsync.value;

  const handleEditServiceDetails = async (updatedForm: FormState) => {

    const updatedVendorService: T.VendorService = {
      _id: vendorServiceId,
      categoryId: updatedForm['categoryId'] as string,
      name: updatedForm['name'] as string, 
      description: updatedForm['description'] as string, 
      cost: updatedForm['cost'] as string,
      durationInSeconds: updatedForm['durationInSeconds'] as number,
      requiredSpaResources: updatedForm['requiredSpaResources'] as T.RequiredSpaResource[],
    }

    const httpStatusCode = await updateSpaServiceById(updatedVendorService);
    if (httpStatusCode === 200) {
      window.location.href = `/vendor/my-spa/services/${vendorServiceId}`;
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <div className="flex flex-col h-full bg-lightBackgrounds w-[80%]">
      <ContentPageTopButtons 
        hideEditDeleteButtons
        editCallback={()=>{}}
        deleteCallback={()=>{}}
      />
      <div className="my-5 flex flex-col w-full text-textsIcons">
        <h1 className="text-3xl font-semibold">Editing: {spaServiceDetails.name}</h1>
      </div>
      <Form 
        initialForm={spaServiceDetails} 
        formName="vendorSpaServiceForm"
        cancelText="Cancel"
        cancelLink={`/vendor/my-spa/services/${vendorServiceId}`}
        actionText="Save"
        actionCallback={handleEditServiceDetails}      
      />
    </div>
  )
}
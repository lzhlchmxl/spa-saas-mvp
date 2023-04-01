import ErrorIndicator from "../../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../../app/UIComponents/Form";
import { createSpaService } from "../../../../utilities/api";
import * as T from "../../../../utilities/types";

export default function CreateVendorService() {

  const handleCreateVendorService = async (updatedForm: FormState) => {

    const updatedSpaService: T.VendorServiceForm = {
      categoryId: updatedForm['categoryId'] as string,
      name: updatedForm['name'] as string,
      description: updatedForm['description'] as string,
      cost: updatedForm['cost'] as string,
      durationInSeconds: updatedForm['durationInSeconds'] as number,
    }
  
    const res = await createSpaService(updatedSpaService);
    if (res.status === 200) {
      window.location.href = '/vendor/my-spa';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <Form 
      initialForm={null}
      formName="vendorSpaServiceForm"
      cancelText="Cancel"
      cancelLink="/vendor/my-spa#services"
      actionText="Create"
      actionCallback={handleCreateVendorService}     
    />
  )
} 
import ErrorIndicator from "../../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../../app/UIComponents/Form";
import { createSpaResource } from "../../../../utilities/api";
import * as T from "../../../../utilities/types";

export default function CreateSpaResource() {

  const handleCreateSpaResource = async (updatedForm: FormState) => {

    const updatedSpaResource: T.SpaResourceForm = {
      name: updatedForm['name'] as string,
      availableCount: updatedForm['avilableCount'] as number,
      type: updatedForm['type'] as T.SpaResourceTypes,
    }

    const res = await createSpaResource(updatedSpaResource);
    if (res.status === 200) {
      window.location.href = '/vendor/my-spa';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <div className="flex items-center w-[80%]">
      <Form 
        initialForm={null}
        formName="vendorSpaResourceForm"
        cancelText="Cancel"
        cancelLink="/vendor/my-spa#resources"
        actionText="Create"
        actionCallback={handleCreateSpaResource}     
      />
    </div>
  )
} 
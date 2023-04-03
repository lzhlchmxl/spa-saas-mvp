import ErrorIndicator from "../../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../../app/UIComponents/Form";
import { createSpaEmployee } from "../../../../utilities/api";
import * as T from "../../../../utilities/types";

export default function CreateVendorService() {

  const handleCreateSpaEmployee = async (updatedForm: FormState) => {

    const updatedSpaEmployee: T.SpaEmployeeForm = {
      username: updatedForm['username'] as string,
      password: updatedForm['password'] as string,
      firstName: updatedForm['firstName'] as string,
      lastName: updatedForm['lastName'] as string,
      status: "active",
      permission: updatedForm['permission'] as "basic" | "advanced",
      unavailableDateTimeRanges: [],
    }
  
    const res = await createSpaEmployee(updatedSpaEmployee);
    if (res.status === 200) {
      window.location.href = '/vendor/my-spa/#employees';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <div className="flex w-innerContentContainerWidth items-center">
      <Form 
        initialForm={null}
        formName="vendorSpaEmployeeForm"
        cancelText="Cancel"
        cancelLink="/vendor/my-spa/#employees"
        actionText="Create"
        actionCallback={handleCreateSpaEmployee}     
      />
    </div>
  )
} 
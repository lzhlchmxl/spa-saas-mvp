import * as T from "../../../utilities/types";
import { createVendorProfile } from "../../../utilities/api";
import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../app/UIComponents/Form";

export default function CreateProfile() {                                                                                                                                                        

  const tryCreate = async (updatedForm: FormState) => {

    const newForm: T.VendorProfile = {
      firstName: updatedForm["firstName"] as string,
      lastName: updatedForm["lastName"] as string,
      phoneNumber: updatedForm["phoneNumber"] as string,
      emailAddress: updatedForm["emailAddress"] as string,
      businessName: updatedForm["businessName"] as string,
      businessAddress: updatedForm["businessAddress"] as string,
      serviceCategories: [],
    }

    const statusCode = await createVendorProfile(newForm);
    if (statusCode === 200) {
      window.location.href = '/vendor/profile';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <Form 
      initialForm={null} 
      formName="vendorProfileForm" 
      cancelText="Cancel"
      cancelLink='/vendor/profile'
      actionText={"Create"} 
      actionCallback={(updatedForm) => tryCreate(updatedForm)}    
    />
  )
}

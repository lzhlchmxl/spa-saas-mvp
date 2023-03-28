import * as T from "../../../utilities/types";
import { createVendorProfile } from "../../../utilities/api";
import VendorProfileForm from "../../../app/UIComponents/VendorProfileForm";
import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";

export default function CreateProfile() {                                                                                                                                                        

  const tryCreate = async (profile: T.VendorProfile) => {
    const statusCode = await createVendorProfile(profile);
    if (statusCode === 200) {
      window.location.href = '/vendor/profile';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <VendorProfileForm 
      initialProfile={null}
      cancelLink='/vendor/profile'
      cancelText="cancel"
      actionText="create"
      actionCallback={ (profile: T.VendorProfile) => tryCreate(profile)}
    />
  )
}

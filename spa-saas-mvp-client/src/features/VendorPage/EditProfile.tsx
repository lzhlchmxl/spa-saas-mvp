import ErrorIndicator from "../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../app/UIComponents/LoadingIndicator";
import VendorProfileForm from "../../app/UIComponents/VendorProfileForm";
import { getVendorProfile, updateVendorProfile } from "../../utilities/api";
import { useAsync } from "../../utilities/customHooks";
import * as T from "../../utilities/types";

export default function EditProfile() {

  const vendorProfileAsync = useAsync(() => getVendorProfile(), []);

  if ( vendorProfileAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( vendorProfileAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const vendorProfile = vendorProfileAsync.value;

  if (vendorProfile === null) {
    window.location.href = '/vendor/profile';
    throw new Error("Cannot edit an empty profile, redirect to create profile");
  }

  const handleTrySaveProfile = async (updatedProfile: T.VendorProfile) => {
    const statusCode = await updateVendorProfile(updatedProfile);
    if (statusCode === 200) {
      window.location.href = '/vendor/profile';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <VendorProfileForm 
      initialProfile={vendorProfile}
      cancelText="CANCEL"
      cancelLink="/vendor/profile"
      actionText="SAVE"
      actionCallback={handleTrySaveProfile}      
    />
  )
}
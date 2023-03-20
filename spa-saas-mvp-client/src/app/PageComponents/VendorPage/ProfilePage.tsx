import CreateProfile from "../../../features/VendorPage/CreateProfile";
import ViewProfile from "../../../features/VendorPage/ViewProfile";
import { deleteClientProfile, getVendorProfile } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import Button from "../../UIComponents/Button";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";


export default function ProfilePage() {

  const vendorProfileAsync = useAsync(() => getVendorProfile(), []);

  if ( vendorProfileAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( vendorProfileAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const vendorProfile = vendorProfileAsync.value;

  const handleEditProfile = () => {
    window.location.href = '/vendor/profile/edit'
  }

  const handleTryDeleteProfile = async () => {
    const statusCode = await deleteClientProfile();
    if (statusCode === 200) {
      window.location.href = '/vendor/profile'
    } else {
      return <ErrorIndicator />
    }
  }

  return (
    <div className="flex">
      {vendorProfile ? <ViewProfile profile={vendorProfile} /> : <CreateProfile />}
      {vendorProfile && 
      <div className="flex h-[50px]">
        <Button 
          actionType="secondary"
          actionText="EDIT"
          actionHandler={handleEditProfile} 
        />
        <Button 
          actionType="danger"
          actionText="DELETE"
          actionHandler={handleTryDeleteProfile} 
        />
      </div>}
    </div>
  )

}
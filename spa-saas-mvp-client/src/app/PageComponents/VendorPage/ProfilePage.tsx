import CreateProfile from "../../../features/VendorPage/Profile/CreateProfile";
import ViewProfile from "../../../features/VendorPage/Profile/ViewProfile";
import { deleteVendorProfile, getVendorProfile } from "../../../utilities/api";
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
    const statusCode = await deleteVendorProfile();
    if (statusCode === 200) {
      window.location.href = '/vendor/profile'
    } else {
      return <ErrorIndicator />
    }
  }

  return (
    <div className="flex h-full w-full justify-center">
      {vendorProfile ? <ViewProfile profile={vendorProfile} /> : <CreateProfile />}
      {vendorProfile && 
      <div className="flex h-[50px] mt-5">
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
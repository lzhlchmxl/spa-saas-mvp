
import CreateProfile from "../../../features/VendorPage/Profile/CreateProfile";
import ViewProfile from "../../../features/VendorPage/Profile/ViewProfile";
import { deleteVendorProfile, getVendorProfile } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import ContentPageTopButtons from "../../UIComponents/ContentPageTopButtons";
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
    <div className="relative flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center">
      <ContentPageTopButtons 
        hideEditDeleteButtons={vendorProfile === null}
        editCallback={handleEditProfile} 
        deleteCallback={handleTryDeleteProfile} 
      />
      <div className="absolute top-1/2 translate-y-[-50%]">
        {vendorProfile ? <ViewProfile profile={vendorProfile} /> : <CreateProfile />}
      </div>
    </div>
  )

}
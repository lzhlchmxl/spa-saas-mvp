import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import CreateProfile from "../../../features/VendorPage/Profile/CreateProfile";
import ViewProfile from "../../../features/VendorPage/Profile/ViewProfile";
import { deleteVendorProfile, getVendorProfile } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import IconButton from "../../UIComponents/IconButton";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";


export default function ProfilePage() {

  const navigate = useNavigate();
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
    <div className="flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center">
      <div 
        className="my-contentPageTopMargin flex justify-between items-center w-full"
      >
        <FontAwesomeIcon onClick={() => {navigate(-1)}} className="hover:cursor-pointer text-textsIcons" icon={faChevronLeft} />
        {vendorProfile &&
        <div className="flex">
          <IconButton icon={faPenToSquare} actionCallback={handleEditProfile} />
          <div className="ml-5">
            <IconButton icon={faTrashCan} actionCallback={handleTryDeleteProfile} />
          </div>
        </div>
        }
      </div>
      {vendorProfile ? <ViewProfile profile={vendorProfile} /> : <CreateProfile />}
    </div>
  )

}
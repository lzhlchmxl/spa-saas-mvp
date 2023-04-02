import CreateProfile from "../../../features/ClientPage/CreateProfile";
import ViewProfile from "../../../features/ClientPage/ViewProfile";
import { deleteClientProfile, getClientProfile } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import ContentPageTopButtons from "../../UIComponents/ContentPageTopButtons";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";
import { useNavigate } from "react-router-dom";


export default function ProfilePage() {

  const navigate = useNavigate();
  const clientProfileAsync = useAsync(() => getClientProfile(), []);

  if ( clientProfileAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( clientProfileAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const clientProfile = clientProfileAsync.value;

  const handleEditProfile = () => {
    navigate('/client/profile/edit');
  }

  const handleTryDeleteProfile = async () => {
    const statusCode = await deleteClientProfile();
    if (statusCode === 200) {
      window.location.href = '/client/profile'
    } else {
      return <ErrorIndicator />
    }
  }

  return (
    <div className="relative flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center">
      <ContentPageTopButtons 
        hideEditDeleteButtons={clientProfile === null}
        editCallback={handleEditProfile} 
        deleteCallback={handleTryDeleteProfile} 
      />
      <div className="absolute top-1/2 translate-y-[-50%]">
        {clientProfile ? <ViewProfile profile={clientProfile} /> : <CreateProfile />}
      </div>
    </div>
  )

}

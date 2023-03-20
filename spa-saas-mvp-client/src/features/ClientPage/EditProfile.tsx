import ErrorIndicator from "../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../app/UIComponents/LoadingIndicator";
import ProfileForm from "../../app/UIComponents/ProfileForm";
import { getClientProfile, updateClientProfile } from "../../utilities/api";
import { useAsync } from "../../utilities/customHooks";
import * as T from "../../utilities/types";

export default function EditProfile() {

  const clientProfileAsync = useAsync(() => getClientProfile(), []);

  if ( clientProfileAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( clientProfileAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const clientProfile = clientProfileAsync.value;

  if (clientProfile === null) {
    window.location.href = '/client/profile';
    throw new Error("Cannot edit an empty profile, redirect to create profile");
  }

  const handleTrySaveProfile = async (updatedProfile: T.ClientProfile) => {
    const statusCode = await updateClientProfile(updatedProfile);
    if (statusCode === 200) {
      window.location.href = '/client/profile';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <ProfileForm 
      initialProfile={clientProfile}
      cancelText="CANCEL"
      cancelLink="/client/profile"
      actionText="SAVE"
      actionCallback={handleTrySaveProfile}      
    />
  )
}
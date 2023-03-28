import * as T from "../../utilities/types";
import { createClientProfile } from "../../utilities/api";
import ProfileForm from "../../app/UIComponents/ProfileForm";
import ErrorIndicator from "../../app/UIComponents/ErrorIndicator";

export default function CreateProfile() {                                                                                                                                                        

  const tryCreate = async (profile: T.ClientProfile) => {
    const statusCode = await createClientProfile(profile);
    if (statusCode === 200) {
      window.location.href = '/client/profile';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <ProfileForm 
      initialForm={null}
      cancelLink='/client/profile'
      cancelText="cancel"
      actionText="create"
      actionCallback={ (profile: T.ClientProfile) => tryCreate(profile)}
    />
  )
}

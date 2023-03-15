import * as T from "../../utilities/types";
import { createProfile } from "../../utilities/api";
import ProfileForm from "../../app/UIComponents/ProfileForm";
import ErrorIndicator from "../../app/UIComponents/ErrorIndicator";

export default function CreateRecipe() {                                                                                                                                                        

  const tryCreate = async (profile: T.ClientProfile) => {
    const statusCode = await createProfile(profile);
    if (statusCode === 200) {
      window.location.href = '/client/profile';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <ProfileForm 
      initialProfile={null}
      cancelLink='/client/profile'
      cancelText="cancel"
      actionText="create"
      actionCallback={ (profile: T.ClientProfile) => tryCreate(profile)}
    />
  )
}

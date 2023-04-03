import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorIndicator from "../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../app/UIComponents/LoadingIndicator";
import { getClientProfile, updateClientProfile } from "../../utilities/api";
import { useAsync } from "../../utilities/customHooks";
import * as T from "../../utilities/types";
import { useNavigate } from "react-router-dom";
import Form, { FormState } from "../../app/UIComponents/Form";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function EditProfile() {

  const navigate = useNavigate();
  const clientProfileAsync = useAsync(() => getClientProfile(), []);

  if ( clientProfileAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( clientProfileAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const clientProfile = clientProfileAsync.value;

  if (clientProfile === null) {
    navigate('/client/profile');
    throw new Error("Cannot edit an empty profile, redirect to create profile");
  }

  const handleTrySaveProfile = async (updatedForm: FormState) => {

    const updatedProfile: T.ClientProfile = {
      firstName: updatedForm['firstName'] as string,
      lastName: updatedForm['lastName'] as string,
      phoneNumber: updatedForm['phoneNumber'] as string,
      emailAddress: updatedForm['emailAddress'] as string,
      dateOfBirth: updatedForm['dateOfBirth'] as Date,
      homeAddress: updatedForm['homeAddress'] as string,
    }

    const statusCode = await updateClientProfile(updatedProfile);
    if (statusCode === 200) {
      window.location.href = '/client/profile';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <div className="flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center">
      <div 
        className="my-contentPageTopMargin flex justify-between items-center w-full"
      >
        <FontAwesomeIcon onClick={() => {navigate(-1)}} className="hover:cursor-pointer text-textsIcons" icon={faChevronLeft} />
      </div>
      <Form 
        initialForm={clientProfile} 
        formName="clientProfileForm" 
        cancelText="Cancel"
        cancelLink='/client/profile'
        actionText="Save"
        actionCallback={(updatedForm) => handleTrySaveProfile(updatedForm)}    
      />
    </div>
  )
}
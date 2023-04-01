import { useNavigate } from "react-router-dom";
import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../app/UIComponents/Form";
import LoadingIndicator from "../../../app/UIComponents/LoadingIndicator";
import { getMySpa, updateMySpaInfo } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import * as T from "../../../utilities/types";

export default function EditMySpaInfo() {

  const navigate = useNavigate();

  // [TODO] build additional endpoints for getMySpaInfo()
  const mySpaAsync = useAsync(() => getMySpa(), []);

  if ( mySpaAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( mySpaAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const mySpa = mySpaAsync.value;

  if (mySpa === null) {
    navigate('/vendor/my-spa');
    throw new Error("Cannot edit an empty spa, redirect to create spa");
  }

  const handleSaveMySpaInfo = async (updatedForm: FormState) => {

    const updatedSpaInfo: T.NewSpa = {
      name: updatedForm['name'] as string,
      description: updatedForm['description'] as string,
    }

    const statusCode = await updateMySpaInfo(updatedSpaInfo);
    if (statusCode === 200) {
      window.location.href = '/vendor/my-spa';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <div className="flex w-[80%] items-center">
      <Form 
        initialForm={mySpa} 
        formName="vendorSpaInfoForm" 
        cancelText="Cancel"
        cancelLink="/vendor/my-spa"
        actionText="Save"
        actionCallback={(form) => handleSaveMySpaInfo(form)}    
      />
    </div>
  )
}
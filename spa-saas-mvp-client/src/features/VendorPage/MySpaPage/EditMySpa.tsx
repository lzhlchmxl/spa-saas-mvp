import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import LoadingIndicator from "../../../app/UIComponents/LoadingIndicator";
import MySpaForm from "../../../app/UIComponents/MySpaForm";
import { getMySpa, updateMySpa } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import * as T from "../../../utilities/types";

export default function EditMySpa() {

  const mySpaAsync = useAsync(() => getMySpa(), []);

  if ( mySpaAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( mySpaAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const mySpa = mySpaAsync.value;

  if (mySpa === null) {
    window.location.href = '/vendor/my-spa';
    throw new Error("Cannot edit an empty spa, redirect to create spa");
  }

  const handleSaveMySpa = async (updatedSpa: T.NewSpa) => {
    const statusCode = await updateMySpa(updatedSpa);
    if (statusCode === 200) {
      window.location.href = '/vendor/my-spa';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <MySpaForm 
      initialForm={mySpa}
      cancelText="CANCEL"
      cancelLink="/vendor/my-spa"
      actionText="SAVE"
      actionCallback={handleSaveMySpa}      
    />
  )
}
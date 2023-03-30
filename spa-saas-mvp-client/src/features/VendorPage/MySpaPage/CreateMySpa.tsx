import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import MySpaForm from "../../../app/UIComponents/MySpaForm";
import { createMySpaInfo} from "../../../utilities/api";
import * as T from "../../../utilities/types";

export default function CreateMySpa() {


  const tryCreate = async (spa: T.NewSpa) => {
    const res = await createMySpaInfo(spa);
    if (res.status === 200) {
      window.location.href = '/vendor/my-spa';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <MySpaForm 
      initialForm={null}
      cancelText="CANCEL"
      cancelLink="/vendor/my-spa"
      actionText="CREATE"
      actionCallback={(mySpa: T.NewSpa) => tryCreate(mySpa)}      
    />
  )
}
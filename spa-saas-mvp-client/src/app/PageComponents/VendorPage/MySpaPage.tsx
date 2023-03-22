import CreateMySpa from "../../../features/VendorPage/MySpaPage/CreateMySpa";
import ViewMySpa from "../../../features/VendorPage/MySpaPage/ViewMySpa";
import { deleteMySpa, getMySpa } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import Button from "../../UIComponents/Button";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";

export default function MySpaPage() {

  const mySpaAsync = useAsync(() => getMySpa(), []);

  if ( mySpaAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( mySpaAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const mySpa = mySpaAsync.value;

  const handleEditMySpa = () => {
    window.location.href = '/vendor/my-spa/edit'
  }

  const handleDeleteMySpa = async () => {
    const statusCode = await deleteMySpa();
    if (statusCode === 200) {
      window.location.href = '/vendor/my-spa'
    } else {
      return <ErrorIndicator />
    }
  }

  return (
    <div className="flex">
      {mySpa ? <ViewMySpa mySpa={mySpa} /> : <CreateMySpa />}
      {mySpa && 
      <div className="flex h-[50px]">
        <Button 
          actionType="secondary"
          actionText="EDIT"
          actionHandler={handleEditMySpa} 
        />
        <Button 
          actionType="danger"
          actionText="DELETE"
          actionHandler={handleDeleteMySpa} 
        />
      </div>}
    </div>
  )

}
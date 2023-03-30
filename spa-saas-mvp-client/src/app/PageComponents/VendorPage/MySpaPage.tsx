import CreateMySpa from "../../../features/VendorPage/MySpaPage/CreateMySpa";
import ViewMySpa from "../../../features/VendorPage/MySpaPage/ViewMySpa";
import { deleteMySpaInfo, getMySpa } from "../../../utilities/api";
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

  console.log(mySpa)

  const handleEditMySpaInfo = () => {
    window.location.href = '/vendor/my-spa/edit'
  }

  const handleDeleteMySpaInfo = async () => {
    const statusCode = await deleteMySpaInfo();
    if (statusCode === 200) {
      window.location.href = '/vendor/my-spa'
    } else {
      return <ErrorIndicator />
    }
  }

  return (
    // <div className="flex w-full justify-center">
    //   {mySpa ? <ViewMySpa mySpa={mySpa} /> : <CreateMySpa />}
    //   {mySpa && 
    //   <div className="flex h-[50px] mt-10">
    //     <Button 
    //       actionType="secondary"
    //       actionText="EDIT"
    //       actionHandler={handleEditMySpaInfo} 
    //     />
    //     <Button 
    //       actionType="danger"
    //       actionText="DELETE"
    //       actionHandler={handleDeleteMySpaInfo} 
    //     />
    //   </div>}
    // </div>

    <div className="flex flex-col h-full w-contentWidth max-w-maxContentWidth items-center">
      {/* <div 
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
      {vendorProfile ? <ViewProfile profile={vendorProfile} /> : <CreateProfile />} */}
    </div>
  )

}
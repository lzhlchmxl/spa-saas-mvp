import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import Form, { FormState } from "../../../app/UIComponents/Form";
import LoadingIndicator from "../../../app/UIComponents/LoadingIndicator";
import VendorProfileForm from "../../../app/UIComponents/[Pending Deletion]VendorProfileForm";
import { getVendorProfile, updateVendorProfile } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import * as T from "../../../utilities/types";

export default function EditProfile() {

  const navigate = useNavigate();
  const vendorProfileAsync = useAsync(() => getVendorProfile(), []);

  if ( vendorProfileAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( vendorProfileAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const vendorProfile = vendorProfileAsync.value;

  if (vendorProfile === null) {
    window.location.href = '/vendor/profile';
    throw new Error("Cannot edit an empty profile, redirect to create profile");
  }

  const handleTrySaveProfile = async (updatedForm: FormState) => {

    const updatedProfile: T.VendorProfile = {
      firstName: updatedForm["firstName"] as string,
      lastName: updatedForm["lastName"] as string,
      phoneNumber: updatedForm["phoneNumber"] as string,
      emailAddress: updatedForm["emailAddress"] as string,
      businessName: updatedForm["businessName"] as string,
      businessAddress: updatedForm["businessAddress"] as string,
      serviceCategories: [],
    }

    const statusCode = await updateVendorProfile(updatedProfile);
    if (statusCode === 200) {
      window.location.href = '/vendor/profile';
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
        initialForm={vendorProfile} 
        formName="vendorProfileForm" 
        cancelText="Cancel"
        cancelLink='/vendor/profile'
        actionText={"Save"} 
        actionCallback={(updatedForm) => handleTrySaveProfile(updatedForm)}    
      />
    </div>
  )
}
import { useState } from "react";
import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import CreateProfile from "../../../features/ClientPortal/CreateProfile";
import ViewProfile from "../../../features/ClientPortal/ViewProfile";
import { deleteProfile, getClientProfile } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import Button from "../../UIComponents/Button";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";


export default function ProfilePage() {

  const clientProfileAsync = useAsync(() => getClientProfile(), []);

  if ( clientProfileAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( clientProfileAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const clientProfile = clientProfileAsync.value;

  const handleEditProfile = () => {
    window.location.href = '/client/profile/edit'
  }

  const handleTryDeleteProfile = async () => {
    const statusCode = await deleteProfile();
    if (statusCode === 200) {
      window.location.href = '/client/profile'
    } else {
      return <ErrorIndicator />
    }
  }

  return (
    <div className="flex">
      {clientProfile ? <ViewProfile profile={clientProfile} /> : <CreateProfile />}
      {clientProfile && 
      <div className="flex h-[50px]">
        <Button 
          actionType="secondary"
          actionText="EDIT"
          actionHandler={handleEditProfile} 
        />
        <Button 
          actionType="danger"
          actionText="DELETE"
          actionHandler={handleTryDeleteProfile} 
        />
      </div>}
    </div>
  )

}
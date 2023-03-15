import { useState } from "react";
import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import CreateProfile from "../../../features/ClientPortal/CreateProfile";
import ViewProfile from "../../../features/ClientPortal/ViewProfile";
import { getClientProfile } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
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

  return (
    <div className="flex">
      {clientProfile ? <ViewProfile profile={clientProfile} /> : <CreateProfile />}
    </div>
  )

}
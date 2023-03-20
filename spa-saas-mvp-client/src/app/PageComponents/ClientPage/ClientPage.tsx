import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { IsAuthContextType } from "../../../App";

export default function ClientPage() {

  const [ isAuthenticated, setIsAuthenticated ] = useOutletContext<IsAuthContextType>();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    console.log(isAuthenticated)
  }

  // const clientId = useRequiredParams("userId");

  // const clientDetailsAsync = useAsync(() => getClientDetails(clientId), []);

  // if ( clientDetailsAsync.status === "pending" ) {
  //   return <LoadingIndicator />;
  // }

  // if ( clientDetailsAsync.status === "rejected" ) {
  //   return <ErrorIndicator />;
  // }

  // const clientDetails = clientDetailsAsync.value;

  return (
    <div className="flex">
      <div className="flex flex-col w-[300px]">
        <NavLink to="/client/profile" >Profile</NavLink>
        <NavLink to="/client/spas" >SPAS</NavLink>
        <NavLink to="/client/appointments" >Appointments</NavLink>
        <NavLink to="/client/history" >History</NavLink>
      </div>
      <Outlet />
    </div>
    // <h1 className="mt-[100px] self-center font-bold">
    //   SPA SaaS Client Page
    // </h1>
  )
}
import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { IsAuthContextType } from "../../../App";

export default function AdminPage() {

  const [ isAuthenticated, setIsAuthenticated ] = useOutletContext<IsAuthContextType>();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    console.log(isAuthenticated)
  }

  // const vendorId = useRequiredParams("userId");

  // const vendorDetailsAsync = useAsync(() => getVendorDetails(vendorId), []);

  // if ( vendorDetailsAsync.status === "pending" ) {
  //   return <LoadingIndicator />;
  // }

  // if ( vendorDetailsAsync.status === "rejected" ) {
  //   return <ErrorIndicator />;
  // }

  // const vendorDetails = vendorDetailsAsync.value;

  return (
    <div className="flex">
      <div className="flex flex-col w-[300px]">
        <NavLink to="/admin/service-categories" >Service Categories</NavLink>
        {/* <NavLink to="/admin/my-store" >My Store</NavLink>
        <NavLink to="/admin/appointments" >Appointments</NavLink>
        <NavLink to="/admin/clients" >Clients</NavLink>
        <NavLink to="/admin/history" >History</NavLink> */}
      </div> 
      <Outlet />
    </div>
  )
}
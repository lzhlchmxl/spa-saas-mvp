import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { IsAuthContextType } from "../../../App";

export default function VendorPage() {

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
        <NavLink to="/vendor/profile" >Profile</NavLink>
        {/* <NavLink to="/vendor/my-store" >My Store</NavLink>
        <NavLink to="/vendor/appointments" >Appointments</NavLink>
        <NavLink to="/vendor/clients" >Clients</NavLink>
        <NavLink to="/vendor/history" >History</NavLink> */}
      </div>
      <Outlet />
    </div>
    // <h1 className="mt-[100px] self-center font-bold">
    //   SPA SaaS Vendor Page
    // </h1>
  )
}
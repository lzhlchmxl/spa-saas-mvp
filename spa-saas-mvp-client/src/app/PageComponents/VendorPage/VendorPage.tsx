import { NavLink, Outlet } from "react-router-dom";

export default function VendorPage() {


  return (
    <div className="flex">
      <div className="flex flex-col w-[300px]">
        <NavLink to="/vendor/profile" >Profile</NavLink>
      </div>
      <Outlet />
    </div>
    // <h1 className="mt-[100px] self-center font-bold">
    //   SPA SaaS Vendor Page
    // </h1>
  )
}
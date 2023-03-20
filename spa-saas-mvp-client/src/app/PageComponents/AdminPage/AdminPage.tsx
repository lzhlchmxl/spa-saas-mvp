import { NavLink, Outlet } from "react-router-dom";

export default function AdminPage() {

  return (
    <div className="flex">
      <div className="flex flex-col w-[300px]">
        <NavLink to="/admin/service-categories" >Service Categories</NavLink>
      </div> 
      <Outlet />
    </div>
  )
}
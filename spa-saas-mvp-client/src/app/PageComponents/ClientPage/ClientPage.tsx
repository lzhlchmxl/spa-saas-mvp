import { NavLink, Outlet } from "react-router-dom";

export default function ClientPage() {

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
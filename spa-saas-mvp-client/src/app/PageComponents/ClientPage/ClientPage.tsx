import { Outlet } from "react-router-dom";

export default function ClientPage() {

  return (
    <div className="flex grow justify-center h-full bg-lightBackgrounds">
      <Outlet />
    </div>
  )
}
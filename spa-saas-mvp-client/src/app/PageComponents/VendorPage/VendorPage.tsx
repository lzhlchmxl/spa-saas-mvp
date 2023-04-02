import { Outlet } from "react-router-dom";

export default function VendorPage() {
  
  return (
    <div className="flex grow justify-center h-full bg-lightBackgrounds">
      <Outlet />
    </div>
  )
}
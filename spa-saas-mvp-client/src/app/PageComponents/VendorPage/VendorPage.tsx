import { Outlet } from "react-router-dom";
import { VendorProfile } from "../../../utilities/types";

export default function VendorPage() {
  
  return (
    <div className="flex grow justify-center h-full bg-lightBackgrounds">
      <Outlet />
    </div>
  )
}
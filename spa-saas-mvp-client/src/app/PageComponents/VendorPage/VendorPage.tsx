import { Outlet } from "react-router-dom";

export default function VendorPage() {
  
  return (
    <div className="flex justify-between w-contentWidth max-w-maxContentWidth h-full">
      <Outlet />
    </div>
  )
}
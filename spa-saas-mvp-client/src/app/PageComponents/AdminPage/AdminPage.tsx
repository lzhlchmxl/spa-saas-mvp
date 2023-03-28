import { Outlet } from "react-router-dom";

export default function AdminPage() {

  return (
    <div className="flex justify-between w-contentWidth max-w-maxContentWidth h-[calc(100%-130px)]">
      <Outlet />
    </div>
  )
}
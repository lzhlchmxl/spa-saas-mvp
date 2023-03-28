import { getServiceCategories } from "../../../utilities/api";
import { useAsync } from "../../../utilities/customHooks";
import Button from "../../UIComponents/Button";
import ErrorIndicator from "../../UIComponents/ErrorIndicator";
import LoadingIndicator from "../../UIComponents/LoadingIndicator";
import * as T from '../../../utilities/types';
import { Outlet } from "react-router-dom";


export default function ServiceCategoriesPage() {

  const serviceCategoriesAsync = useAsync(() => getServiceCategories(), []);

  if ( serviceCategoriesAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( serviceCategoriesAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const serviceCategories = serviceCategoriesAsync.value;
  const serviceCategoriesHTML = serviceCategories.map(serviceCategory => {
    return (
      <div
        onClick={ () => handleViewServiceCategoryDetails(serviceCategory._id)}
        key={serviceCategory._id}
        className="flex border border-borders hover:bg-highlight transition-colors duration-200 cursor-pointer"
      >
        <p className="w-1/2 p-4 text-textsIcons font-medium">{serviceCategory.name}</p>
        <p className="w-1/2 p-4 text-textsIcons">{serviceCategory.description}</p>
      </div>
    )
  })

  const handleViewServiceCategoryDetails = (id: T.ServiceCategoryId) => {
    window.location.href = `/admin/service-categories/${id}`
  }

  const handleCreateServiceCategory = () => {
    window.location.href = `/admin/service-categories/create`
  }

  return (
    <div className="flex w-full">
      <div className="flex w-full justify-center items-center flex-col">
        <div className="flex flex-col w-[80%] h-full">
          <div className="flex self-end">
            <Button 
              actionType="primary" 
              actionText="New Category"
              actionHandler={handleCreateServiceCategory}      
            />
          </div>
          <div className="flex border border-borders font-medium bg-backgrounds">
            <p className="w-1/2 p-4 text-textsIcons">Name</p>
            <p className="w-1/2 p-4 text-textsIcons">Description</p>
          </div>
          <div className="overflow-y-auto">
            {serviceCategoriesHTML}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )

}
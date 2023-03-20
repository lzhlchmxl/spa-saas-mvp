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
  const serviceCategoriesHTML = <ul>{serviceCategories.map(serviceCategory => {
    return (
      <li 
        key={serviceCategory._id}
      >
        <p 
          onClick={() => handleViewServiceCategoryDetails(serviceCategory._id)}
          className="hover:cursor-pointer"
        >
          {serviceCategory.name}
        </p>
        {/* <Button 
          actionType="secondary"
          actionText="EDIT"
          actionHandler={() => handleEditServiceCategory(serviceCategory._id)} 
        /> */}
      </li>
    )
  })}</ul>

  const handleEditServiceCategory = (id: T.ServiceCategoryId) => {
    window.location.href = `/admin/service-categories/edit/${id}`
  }

  const handleViewServiceCategoryDetails = (id: T.ServiceCategoryId) => {
    window.location.href = `/admin/service-categories/view/${id}`
  }

  const handleCreateServiceCategory = () => {
    window.location.href = `/admin/service-categories/create`
  }

  return (
    <div className="flex">
     {serviceCategoriesHTML}
      <div className="flex h-[50px]">
        <Button 
          actionType="primary"
          actionText="NEW CATEGORY"
          actionHandler={handleCreateServiceCategory} 
        />
      </div>
      <Outlet />
    </div>
  )

}
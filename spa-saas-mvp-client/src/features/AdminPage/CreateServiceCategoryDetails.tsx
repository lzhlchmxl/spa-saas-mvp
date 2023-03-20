import ServiceCategoryDetailsForm from '../../app/UIComponents/ServiceCategoryDetailsForm';
import { createServiceCategoryDetails } from '../../utilities/api';
import * as T from '../../utilities/types';


export default function CreateServiceCategoryDetailsPage() {

  const handleCreateServiceCategory = async (serviceCategoryDetails: T.NewServiceCategory) => {

    const response = await createServiceCategoryDetails(serviceCategoryDetails);

    const responseJSON = await response.json();

    window.alert(`${responseJSON.message} Redirecting...`);

    if (responseJSON.id) {
      window.location.href = `/admin/service-categories/view/${responseJSON.id}`
    } else {
      window.location.href = `/admin/service-categories`
    }
  }
  
  return (
    <div className="flex">
      <ServiceCategoryDetailsForm 
        initialForm={null} 
        cancelText='CANCEL' 
        cancelLink='/admin/service-categories' 
        actionText='CREATE' 
        actionCallback={handleCreateServiceCategory}
      />
    </div>
  )

}
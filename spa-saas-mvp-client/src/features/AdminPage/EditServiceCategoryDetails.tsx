import ErrorIndicator from '../../app/UIComponents/ErrorIndicator';
import LoadingIndicator from '../../app/UIComponents/LoadingIndicator';
import ServiceCategoryDetailsForm from '../../app/UIComponents/ServiceCategoryDetailsForm';
import { getServiceCategoryDetails, updateServiceCategoryDetails } from '../../utilities/api';
import { useAsync, useRequiredParams } from '../../utilities/customHooks';
import * as T from '../../utilities/types';


export default function EditServiceCategoryDetailsPage() {

  const id = useRequiredParams('serviceCategoryId');

  const serviceCategoryDetailsAsync = useAsync(() => getServiceCategoryDetails(id), []);

  if ( serviceCategoryDetailsAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( serviceCategoryDetailsAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const initialServiceCategoryDetails =  serviceCategoryDetailsAsync.value;

  const handleEditServiceCategory = async (serviceCategoryDetails: T.NewServiceCategory) => {
    const updatedServiceCategoryDetails = {
      ...serviceCategoryDetails,
      _id: initialServiceCategoryDetails._id,
    }
    const responseStatus = await updateServiceCategoryDetails(updatedServiceCategoryDetails);

    if (responseStatus === 200) {
      window.location.href = `/admin/service-categories/view/${initialServiceCategoryDetails._id}`
    } else {
      window.alert('Error updating service-category, redirectig...');
      window.location.href = `/admin/service-categories`
    }
  }
  
  return (
    <div className="flex">
      <ServiceCategoryDetailsForm 
        initialForm={initialServiceCategoryDetails} 
        cancelText='CANCEL' 
        cancelLink='/admin/service-categories' 
        actionText='EDIT' 
        actionCallback={handleEditServiceCategory} 
        />
    </div>
  )

}
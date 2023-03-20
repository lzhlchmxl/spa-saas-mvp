
import Button from '../../app/UIComponents/Button';
import ErrorIndicator from '../../app/UIComponents/ErrorIndicator';
import LoadingIndicator from '../../app/UIComponents/LoadingIndicator';
import { getServiceCategoryDetails } from '../../utilities/api';
import { useAsync, useRequiredParams } from '../../utilities/customHooks';

export default function ViewServiceCategoryDetailsPage() {

  const id = useRequiredParams('serviceCategoryId');

  const serviceCategoryDetailsAsync = useAsync(() => getServiceCategoryDetails(id), [id]);

  if ( serviceCategoryDetailsAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( serviceCategoryDetailsAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const serviceCategoryDetails = serviceCategoryDetailsAsync.value;

  const handleBackButtonClick = () => {
    window.location.href = `/admin/service-categories`
  }

  const handleEditServiceCategory = () => {
    window.location.href = `/admin/service-categories/edit/${serviceCategoryDetails._id}`
  }
  
  return (
    <div className="flex">
      <div className="flex h-[50px]">
        <Button 
          actionType="tertiary"
          actionText="BACK"
          actionHandler={handleBackButtonClick} 
        />
      </div>
      <div>
        <p>{serviceCategoryDetails.name}</p>
        <p>{serviceCategoryDetails.description}</p>
      </div>
      <div className="flex h-[50px]">
        <Button 
          actionType="secondary"
          actionText="EDIT"
          actionHandler={handleEditServiceCategory} 
        />
      </div>
    </div>
  )

}
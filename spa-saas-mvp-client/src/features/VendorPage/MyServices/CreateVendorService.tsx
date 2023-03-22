import ErrorIndicator from "../../../app/UIComponents/ErrorIndicator";
import VendorServiceForm from "../../../app/UIComponents/VendorServiceForm";
import { createMyService } from "../../../utilities/api";
import * as T from "../../../utilities/types";

export default function CreateVendorService() {

  const handleCreateVendorService = async (vendorServiceForm: T.VendorServiceForm) => {
  
    const res = await createMyService(vendorServiceForm);
    if (res.status === 200) {
      window.location.href = '/vendor/my-services';
    } else {
      return (<ErrorIndicator />);
    }
  }

  return (
    <VendorServiceForm 
      initialForm={null} 
      cancelText="CANCEL"
      cancelLink="/vendor/my-services"
      actionText="CREATE" 
      actionCallback={handleCreateVendorService} />
  )
} 
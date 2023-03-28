import * as T from "../../utilities/types";
import { useState } from "react";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";

function VendorProfileForm({
    initialProfile,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  {
    initialProfile: T.VendorProfile | null,
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (profile: T.VendorProfile) => void,
  }) {

  const [firstName, setFirstName] = useState(initialProfile ? initialProfile.firstName : "");
  const [lastName, setLastName] = useState(initialProfile ? initialProfile.lastName : "");
  const [phoneNumber, setPhoneNumber] = useState(initialProfile ? initialProfile.phoneNumber : "");
  const [emailAddress, setEmailAddress] = useState(initialProfile ? initialProfile.emailAddress : "");
  const [businessAddress, setBusinessAddress] = useState(initialProfile ? initialProfile.businessAddress : "");
  const [businessName, setBusinessName] = useState(initialProfile ? initialProfile.businessName : "");
  const [serviceCategories, setServicesCategories] = useState(initialProfile ? initialProfile.serviceCategories : []);
   
  const [isAnyFieldChanged, setIsAnyFieldChanged] = useState(false);
  const areAllFieldsValid = firstName !== "" && lastName !== "" && phoneNumber !== "" && emailAddress !== "" && businessAddress !== "" && businessName !== null;
  
  const handleSetter = (v: string, setter: (v: string) => void) => {
    setter(v);
    setIsAnyFieldChanged(true)
  }

  const tryCancel = () => {
    if (isAnyFieldChanged) {
      if(window.confirm("Unsaved changes will be discard. Confirm?")) {
        window.location.href = cancelLink;
      }
    } else {
      window.location.href = cancelLink;
    }
  }

  const tryPassCreationInfoToParent = () => {
    if (areAllFieldsValid) {
      return actionCallback({
        firstName,
        lastName,
        phoneNumber,
        emailAddress,
        businessAddress,
        businessName,
        serviceCategories,
      });
    }
    alert("Please fill all the fields.")
    throw new Error("Cannot create profile with incomplete information");
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="w-[80%] max-w-[500px]">
        <InputWithLabel 
          label="firstname"
          name="first-name" 
          type="text"
          value={firstName} 
          setValue={(v) => handleSetter(v, setFirstName)}        
        />
        <InputWithLabel 
          label="lastname"
          name="last-name" 
          type="text"
          value={lastName} 
          setValue={(v) => handleSetter(v, setLastName)}        
        />
        <InputWithLabel 
          label="phone number"
          name="phone-number" 
          type="text"
          value={phoneNumber} 
          setValue={(v) => handleSetter(v, setPhoneNumber)}        
        />
        <InputWithLabel 
          label="email address"
          name="email-address" 
          type="email"
          value={emailAddress} 
          setValue={(v) => handleSetter(v, setEmailAddress)}        
        />
        <InputWithLabel 
          label="business name"
          name="business-name" 
          type="text"
          value={businessName} 
          setValue={(v) => handleSetter(v, setBusinessName)}        
        />
        <InputWithLabel 
          label="business address"
          name="business-address" 
          type="text"
          value={businessAddress} 
          setValue={(v) => handleSetter(v, setBusinessAddress)}        
        />
        <div className="flex justify-evenly mt-5">
          <Button 
            actionHandler={tryPassCreationInfoToParent}
            actionText={actionText}
            actionType="primary"
          />
          {
            initialProfile &&
            <Button 
              actionHandler={tryCancel}
              actionText={cancelText}
              actionType="secondary"
            />
          }
        </div>
      </div>
    </div>
  )
}

export default VendorProfileForm;
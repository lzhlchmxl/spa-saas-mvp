import * as T from "../../utilities/types";
import { useState } from "react";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";
import DatePickerWithLabel from "./DatePickerWithLabel";

function RecipeForm({
    initialProfile,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  {
    initialProfile: T.ClientProfile | null,
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (recipe: T.ClientProfile) => void,

  }) {

  const [firstName, setFirstName] = useState(initialProfile ? initialProfile.firstName : "");
  const [lastName, setLastName] = useState(initialProfile ? initialProfile.lastName : "");
  const [phoneNumber, setPhoneNumber] = useState(initialProfile ? initialProfile.phoneNumber : "");
  const [emailAddress, setEmailAddress] = useState(initialProfile ? initialProfile.emailAddress : "");
  const [homeAddress, setHomeAddress] = useState(initialProfile ? initialProfile.homeAddress : "");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(initialProfile ? initialProfile.dateOfBirth : null);

  const areAllFieldsValid = firstName !== "" && lastName !== "" && phoneNumber !== "" && emailAddress !== "" && homeAddress !== "" && dateOfBirth !== null;
  const isAnyFieldChanged = firstName !== "" || lastName !== "" || phoneNumber !== "" || emailAddress !== "" || homeAddress !== "" || dateOfBirth !== null;
  
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
        homeAddress,
        dateOfBirth
      });
    }
    alert("Please fill all the fields.")
    throw new Error("Cannot create profile with incomplete information");
  }

  return (
    <div className="flex flex-col w-full">
      <InputWithLabel 
        label="firstname"
        name="first-name" 
        type="text"
        value={firstName} 
        setValue={setFirstName}        
      />
      <InputWithLabel 
        label="lastname"
        name="last-name" 
        type="text"
        value={lastName} 
        setValue={setLastName}        
      />
      <InputWithLabel 
        label="phone number"
        name="phone-number" 
        type="text"
        value={phoneNumber} 
        setValue={setPhoneNumber}        
      />
      <InputWithLabel 
        label="email address"
        name="email-address" 
        type="email"
        value={emailAddress} 
        setValue={setEmailAddress}        
      />
      <InputWithLabel 
        label="home address"
        name="home-address" 
        type="text"
        value={homeAddress} 
        setValue={setHomeAddress}        
      />
      <DatePickerWithLabel 
        label="date of birth"
        name="date-of-birth" 
        value={dateOfBirth} 
        setValue={setDateOfBirth}        
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
  )
}

export default RecipeForm;
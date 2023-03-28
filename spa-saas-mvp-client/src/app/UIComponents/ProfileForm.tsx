import * as T from "../../utilities/types";
import { useState } from "react";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";
import DatePickerWithLabel from "./DatePickerWithLabel";

function ProfileForm({
    initialForm: initialProfile,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  {
    initialForm: T.ClientProfile | null,
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (profile: T.ClientProfile) => void,

  }) {

  const [firstName, setFirstName] = useState(initialProfile ? initialProfile.firstName : "");
  const [lastName, setLastName] = useState(initialProfile ? initialProfile.lastName : "");
  const [phoneNumber, setPhoneNumber] = useState(initialProfile ? initialProfile.phoneNumber : "");
  const [emailAddress, setEmailAddress] = useState(initialProfile ? initialProfile.emailAddress : "");
  const [homeAddress, setHomeAddress] = useState(initialProfile ? initialProfile.homeAddress : "");
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(initialProfile ?initialProfile.dateOfBirth : null);

  const areAllFieldsValid = firstName !== "" && lastName !== "" && phoneNumber !== "" && emailAddress !== "" && homeAddress !== "" && dateOfBirth !== null;
  const [isAnyFieldChanged, setIsAnyFieldChanged] = useState(false);
  
  const handleSetter = <T,>(v: T, setter: (v: T) => void) => {
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
        homeAddress,
        dateOfBirth
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
          label="home address"
          name="home-address" 
          type="text"
          value={homeAddress} 
          setValue={(v) => handleSetter(v, setHomeAddress)}        
        />
        <DatePickerWithLabel 
          label="date of birth"
          name="date-of-birth" 
          value={dateOfBirth} 
          setValue={(v) => handleSetter(v, setDateOfBirth)}        
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

export default ProfileForm;
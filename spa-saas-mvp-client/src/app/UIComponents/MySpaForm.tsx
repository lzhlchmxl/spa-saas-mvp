import * as T from "../../utilities/types";
import { useState } from "react";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";
import { useAsync } from "../../utilities/customHooks";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";
import { getServiceCategories } from "../../utilities/api";

export default function MySpaForm({
    initialForm,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  {
    initialForm: T.NewSpa | null,
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (form: T.NewSpa) => void,
  }) {

  const [name, setName] = useState(initialForm ? initialForm.name : "");
  const [description, setDescription] = useState(initialForm ? initialForm.description : "");

  const [isAnyFieldChanged, setIsAnyFieldChanged] = useState(false);
  const areAllFieldsValid = name !== "" && description !== "";
  
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
        name,
        description,
      });
    }
    alert("Please fill all the fields.")
    throw new Error("Cannot create profile with incomplete information");
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="w-[80%] max-w-[500px]">
        <InputWithLabel 
          label="name"
          name="name" 
          type="text"
          value={name} 
          setValue={(v) => handleSetter(v, setName)}        
        />
        <InputWithLabel 
          label="description"
          name="description" 
          type="text"
          value={description} 
          setValue={(v) => handleSetter(v, setDescription)}        
        />
        <div className="flex justify-evenly mt-5">
          <Button 
            actionHandler={tryPassCreationInfoToParent}
            actionText={actionText}
            actionType="primary"
          />
          {
            initialForm &&
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


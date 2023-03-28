import { useState } from "react";
import InputWithLabel from "../../app/UIComponents/InputWithLabel";
import * as T from "../../utilities/types";
import Button from "./Button";
import DurationPicker from "./DurationPicker";
import SelectWithLabel from "../UIComponents/SelectWithLabel";
import { useAsync } from "../../utilities/customHooks";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";
import { getServiceCategories } from "../../utilities/api";

export default function VendorServiceForm(
  { 
    initialForm,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  { 
    initialForm: T.VendorServiceForm | null
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (form: T.VendorServiceForm) => void,
  }) {

  const [categoryId, setCategoryId] = useState(initialForm ? initialForm.categoryId: "");
  const [name, setName] = useState(initialForm ? initialForm.name : "");
  const [description, setDescription] = useState(initialForm ? initialForm.description : "");
  const [cost, setCost] = useState(initialForm ? initialForm.cost : "");
  const [durationInSeconds, setDurationInSeconds] = useState(initialForm ? initialForm.durationInSeconds : 0);

  const serviceCategoriesAsync = useAsync(() => getServiceCategories(), []);
  const [isAnyFieldChanged, setIsAnyFieldChanged] = useState(false);

  if ( serviceCategoriesAsync.status === "pending" ) {
    return <LoadingIndicator />;
  }

  if ( serviceCategoriesAsync.status === "rejected" ) {
    return <ErrorIndicator />;
  }

  const serviceCategories = serviceCategoriesAsync.value;
  const selections = serviceCategories.map( serviceCategory => {
    return (
      {
        value: serviceCategory._id,
        text: serviceCategory.name,
      }
    )
  })

  
  const areAllFieldsValid = categoryId !== '' && name !== "" && description !== "" && cost !== "" && durationInSeconds !== 0;

  function handleSetter<T>(v: T, setter: (v: T) => void) {
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
        categoryId,
        name,
        description,
        cost,
        durationInSeconds,
      });
    }
    alert("Please fill all the fields.")
    throw new Error("Cannot create profile with incomplete information");
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-5">
        <SelectWithLabel 
          label="category"
          name="service-category"
          selections={selections} 
          selected={categoryId}
          setSelected={setCategoryId}      
        />
      </div>
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
      <InputWithLabel 
        label="cost per session"
        name="cost" 
        type="text"
        value={cost} 
        setValue={(v) => handleSetter(v, setCost)}        
      />
      <DurationPicker 
        initialTotalSeconds={durationInSeconds} 
        setDurationInSeconds={setDurationInSeconds}      
      />
      <div className="flex justify-evenly mt-5">
        <Button 
          actionHandler={tryPassCreationInfoToParent}
          actionText={actionText}
          actionType="primary"
        />
        <Button 
          actionHandler={tryCancel}
          actionText={cancelText}
          actionType="secondary"
        />
      </div>
    </div>
  )
}
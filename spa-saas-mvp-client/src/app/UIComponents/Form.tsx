import * as T from "../../utilities/types";
import { useState } from "react";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";
import { clientProfileFormData, vendorProfileFormData, vendorSpaEmployeeFormData, vendorSpaInfoFormData, vendorSpaResourceFormData, vendorSpaServiceFormData } from "../../utilities/data";
import { useNavigate } from "react-router-dom";
import DurationPickerWithLabel from "./DurationPickerWithLabel";
import { useAsync } from "../../utilities/customHooks";
import { getSpaResources } from "../../utilities/api";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";
import DatePickerWithLabel from "./DatePickerWithLabel";
import { addSpaceBeforeCapitalLetters } from "../../utilities/utilityFunctions";

export interface FormState {
  [key: string]: FormStateValue;
}

type FormStateValue = null | string | number | Date | T.ServiceCategory[] | T.VendorService[] | T.SpaEmployee[] | T.SpaResource[] | T.RequiredSpaResource[];

export default function Form({
    initialForm,
    formName,
    cancelText,
    cancelLink,
    actionText,
    actionCallback,
  }
  : 
  {
    initialForm: FormState | null,
    formName: string,
    cancelText: string,
    cancelLink: string,
    actionText: string,
    actionCallback: (form: FormState) => void,
  }) {

  const navigate = useNavigate();
  const getFormData = () => {
    switch(formName) {
      case 'vendorProfileForm':
        return vendorProfileFormData;
      case 'vendorSpaInfoForm':
        return vendorSpaInfoFormData;
      case 'vendorSpaServiceForm':
        return vendorSpaServiceFormData;
      case 'vendorSpaResourceForm':
        return vendorSpaResourceFormData;
      case 'clientProfileForm':
        return clientProfileFormData;
      case 'vendorSpaEmployeeForm':
        return vendorSpaEmployeeFormData;
      default:
        throw new Error("Unknown form name.")
    }  
  }

  const data = getFormData();

  // Create initial form state based on initialForm prop and extracted formData based on formName prop
  const initialState = data.reduce((acc: FormState, curr) => {
    acc[curr.stateName] = initialForm === null ? curr.initialStateValue : initialForm[curr.stateName];
    return acc;
  }, {});

  const [state, setState] = useState(initialState);

  const [isAnyFieldChanged, setIsAnyFieldChanged] = useState(false);
  // const areAllFieldsValid = firstName !== "" && lastName !== "" && phoneNumber !== "" && emailAddress !== "" && businessAddress !== "" && businessName !== null;
  const areAllFieldsValid = true;

  const updateState = (name: string, value: FormStateValue) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
    setIsAnyFieldChanged(true)
  };

  const tryCancel = () => {
    if (isAnyFieldChanged) {
      if(window.confirm("Unsaved changes will be discard. Confirm?")) {
        navigate(cancelLink);
      }
    } else {
      navigate(cancelLink);
    }
  }

  const tryPassCreationInfoToParent = () => {
    if (areAllFieldsValid) {
      return actionCallback(state);
    }
    alert("Please fill all the fields.")
    throw new Error("Cannot create profile with incomplete information");
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {/* <div className="w-[80%] max-w-[500px]"> */}
        {Object.keys(state).map( key => {
          const formData = data.find( entry => entry.stateName === key);
          if (formData === undefined) {
            throw new Error("No formData found by given key.");
          }
          switch(formData.inputType) {
            case "text":
            case "number":
              return (
                <InputWithLabel 
                  key={key}
                  label={addSpaceBeforeCapitalLetters(key)}
                  name={key}
                  type={formData.inputType}
                  value={state[key]} 
                  setValue={(v) => updateState(key, v)}        
                />
              )
            case "duration":
              return (
                <DurationPickerWithLabel 
                  label={"Duration"}
                  key={key}
                  initialTotalSeconds={state[key] as number} 
                  setDurationInSeconds={(v) => updateState(key, v)}      
                />
              )
            case "date":
              return (
                <DatePickerWithLabel 
                  key={key} 
                  label={addSpaceBeforeCapitalLetters(key)} 
                  name={key} 
                  value={state[key] as Date} 
                  setValue={(v) => updateState(key, v)}    
                />
              )
            case "requiredSpaResourcesTable":
              return (
                <RequiredSpaResourcesTable
                  key={key}
                  label="Required Resources"
                  requiredSpaResources={state[key] as T.RequiredSpaResource[]}
                  setRequiredSpaResources={(v) => updateState(key, v)}               
                />
              )
            // [Note]: temp type for under-construction item 
            case "undefined":
              return <div key={key}></div>;
            default:
              throw new Error("Unknown formData input type.");
          }
        })}
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
      {/* </div> */}
    </div>
  )
}


function RequiredSpaResourcesTable({
  label,
  requiredSpaResources,
  setRequiredSpaResources,
}
:
{
  label: string,
  requiredSpaResources: T.RequiredSpaResource [],
  setRequiredSpaResources: (v: T.RequiredSpaResource[]) => void
}
) {

  const spaResourcesAsync = useAsync(getSpaResources, []);

  if (spaResourcesAsync.status === "pending") {
    return <LoadingIndicator />
  }

  if (spaResourcesAsync.status === "rejected") {
    return <ErrorIndicator />
  }

  const spaResources = spaResourcesAsync.value;

  const handleIsRequiredResourceToggle = (isRequired: boolean, resource: T.SpaResource) => {
    
    let updatedRequiredSpaResources = [...requiredSpaResources];

    if (isRequired) {
      updatedRequiredSpaResources.push({spaResource: resource, requiredCount: 0});
    } else {
      updatedRequiredSpaResources = requiredSpaResources.filter( requiredSpaResource => requiredSpaResource.spaResource._id !== resource._id);
    }

    setRequiredSpaResources(updatedRequiredSpaResources);
  }

  const handleResourceRequiredCountUpdate = (requiredCount: number, resourceId: string) => {
    
    const updatedRequiredSpaResources = [...requiredSpaResources];

    const targetResource = updatedRequiredSpaResources.find(updatedRequiredSpaResource => updatedRequiredSpaResource.spaResource._id === resourceId)
    
    if (targetResource === undefined) {
      throw new Error("No matching target resource found when updating required count.");
    }
    
    targetResource.requiredCount = requiredCount;
    
    setRequiredSpaResources(updatedRequiredSpaResources);
  }


  const spaResourcesHTML = spaResources.map( spaResource => {

    const requiredSpaResource = requiredSpaResources.find( requiredSpaResource => requiredSpaResource.spaResource._id === spaResource._id);
    const isRequired = requiredSpaResource !== undefined;
    
    return (
      <div 
        className="flex flex-col mt-1 text-textsIcons"
        key={spaResource._id}
      >
        <div className="flex mb-1 items-center">
          <div className="flex w-1/12 justify-center ">
            <input 
              checked={isRequired}
              type="checkbox"
              onChange={ (e) => handleIsRequiredResourceToggle(e.currentTarget.checked, spaResource)}
            />
          </div>
          <div className="w-3/12 flex justify-center">
              <input
                disabled={!isRequired}
                type="number"
                value={requiredSpaResource ? requiredSpaResource.requiredCount : 0}
                className='bg-lightBackgrounds border border-white/30 rounded-md p-2 w-[60%]' 
                onChange={ (e) => handleResourceRequiredCountUpdate(parseFloat(e.currentTarget.value), spaResource._id) }
              />
            </div>
          <p className="w-1/6">{spaResource.type}</p>
          <p className="w-1/3">{spaResource.name}</p>
          <p className="w-1/6 text-center">{spaResource.availableCount}</p> 
        </div>
      </div> 
    )
  })

  return (
    <div className='flex flex-col mb-5 w-full  text-textsIcons'>
      <label className="capitalize font-semibold mb-1">{label}</label>
      <div className="flex flex-col mt-1 text-textsIcons">
        <div className="flex mb-1">
          <p className="w-1/12"></p>
          <p className="w-3/12 text-center"># Required</p>
          <p className="w-1/6">Type</p>
          <p className="w-1/3">Name</p>
          <p className="w-1/6"># Available</p>
        </div>
      </div>
      {spaResourcesHTML} 
    </div>
  )
}
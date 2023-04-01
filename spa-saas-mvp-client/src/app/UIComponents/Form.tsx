import * as T from "../../utilities/types";
import { useState } from "react";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";
import { vendorProfileFormData, vendorSpaInfoFormData, vendorSpaResourceFormData, vendorSpaServiceFormData } from "../../utilities/data";
import { useNavigate } from "react-router-dom";
import DurationPicker from "./DurationPicker";

export interface FormState {
  [key: string]: FormStateValue;
}

type FormStateValue = string | number | T.ServiceCategory[] | T.VendorService[] | T.SpaEmployee[] | T.SpaResource[];

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
      <div className="w-[80%] max-w-[500px]">
        {Object.keys(state).map( key => {
          const formData = data.find( entry => entry.stateName === key);
          if (formData === undefined) {
            throw new Error("No formData found by given key.");
          }
          switch(formData.inputType) {
            case "text":
            case "number":
              return (
                <div key={key}>
                  <InputWithLabel 
                    label={key}
                    name={key}
                    type={formData.inputType}
                    value={state[key]} 
                    setValue={(v) => updateState(key, v)}        
                  />
                </div>
              )
            case "duration":
              return (
                <div key={key}>
                  <DurationPicker 
                    initialTotalSeconds={state[key] as number} 
                    setDurationInSeconds={(v) => updateState(key, v)}      
                  />
                </div>
              )
            case "undefined":
              break;
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
      </div>
    </div>
  )
}

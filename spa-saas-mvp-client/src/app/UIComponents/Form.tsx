import * as T from "../../utilities/types";
import { useState } from "react";
import Button from "./Button";
import InputWithLabel from "./InputWithLabel";
import { vendorProfileFormData } from "../../utilities/data";

export interface FormState {
  [key: string]: string | T.ServiceCategory[];
}

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

  const getFormData = () => {
    switch(formName) {
      case 'vendorProfileForm':
        return vendorProfileFormData;
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

  const updateState = (name: string, value: string | T.ServiceCategory[]) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
    setIsAnyFieldChanged(true)
  };

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
              return (
                <div key={key}>
                  <InputWithLabel 
                    label={key}
                    name={key}
                    type="text"
                    value={state[key]} 
                    setValue={(v) => updateState(key, v)}        
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

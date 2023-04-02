import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerWithLabel(
  {
    label,
    name,
    value,
    setValue,
    disabled,
  }
  :
  {
    label: string,
    name: string,
    value: Date | null,
    setValue: (value: Date | null) => void,
    disabled?: boolean,
  }
) {

  const date = value ? moment(value).toDate() : null;

  return (
    <div className='flex flex-col mb-5 w-full  text-textsIcons'>
      <label className="capitalize font-semibold mb-1" htmlFor={name}>{label}</label>
      <DatePicker 
        className='bg-lightBackgrounds border border-white/30 rounded-md p-2'
        name={name}
        selected={date}
        onChange={setValue}
      />
    </div>
  )
}
import moment from 'moment';
import DatePicker from 'react-date-picker';

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
        name={name}
        value={date}
        onChange={setValue}
      />
    </div>
  )
}
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
    setValue: (value: Date) => void,
    disabled?: boolean,
  }
) {

  return (
    <div className='flex flex-col mb-5'>
      <label className="capitalize" htmlFor={name}>{label}</label>
      <DatePicker 
        name={name}
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
export default function InputWithLabel<T>(
  {
    label,
    name,
    placeholder,
    type,
    value,
    setValue,
    disabled,
  }
  :
  {
    label: string,
    name: string,
    type: string,
    placeholder?: string,
    value: T,
    setValue: (value: T) => void,
    disabled?: boolean,
  }
) {

  return (
    <div className='flex flex-col mb-5  text-textsIcons'>
      <label className="capitalize font-semibold" htmlFor={name}>{label}</label>
      <input
        disabled={disabled !== undefined ? disabled : false}
        type={type}
        value={value as string}
        placeholder={placeholder}
        name={name}
        id={name}
        className='bg-white border border-lightGray rounded-md py-1 px-2' 
        onChange={ e => setValue(e.currentTarget.value as T) }
      />
    </div>
  )
}
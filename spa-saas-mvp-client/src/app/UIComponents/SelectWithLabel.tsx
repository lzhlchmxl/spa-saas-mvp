export default function selectWithLabel(
  {
    defaultText,
    label,
    name,
    selections,
    selected,
    setSelected,
  }
  :
  {
    defaultText?: string,
    label: string,
    name: string,
    selections: {value: string, text: string}[],
    selected: string,
    setSelected: (value: string) => void,
  }
) {

  const selectionsHTML = selections.map( (selection, index) => {
    return <option value={selection.value} key={index}>{selection.text}</option>;
  })

  return (
    <div className='flex flex-col text-textsIcons'>
      <label className="capitalize font-semibold" htmlFor={name}>{label}</label>
      <select
        className="bg-white border border-lightGray rounded-md"
        name={name}
        id={name}
        value={selected}     
        onChange={ e => setSelected(e.currentTarget.value) }
      >
        <option value={''} disabled hidden>{defaultText}</option>
        { selectionsHTML }
      </select>

    </div>
  )
}
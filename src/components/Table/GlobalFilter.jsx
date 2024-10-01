import { React, useState } from "react"


export default function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  }) {
  const count = preGlobalFilteredRows.length // number of entries
  const [value, setValue] = useState(globalFilter)
  const onChange = (value) => setGlobalFilter(value || undefined)

//  search bar which calls onchange to update value of globalFilter 
  return (
    <span>
      Search:{' '}
      <input
        value={value || ''} // value or empty
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} entries...`}
      />
    </span>
  )
}

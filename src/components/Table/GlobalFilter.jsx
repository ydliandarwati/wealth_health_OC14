/* react  */
import React from "react"
/*  react-table  */
import { useAsyncDebounce } from 'react-table' 


/**
  * @function GlobalFilter
  * @export
  * @description  Define a default UI for filtering 
*/
export default function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  }) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  /* The useAsyncDebounce is used to add a little delay to avoid
   too many re-renders while the user is typing  */
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} entries....`}
      />
    </span>
  )
}

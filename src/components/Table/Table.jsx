import React from "react"
// react table
import { useTable, useGlobalFilter, useSortBy, usePagination   } from 'react-table' 
// GlobalFilter for table
import GlobalFilter from "./GlobalFilter"
// prop types
import PropTypes from 'prop-types'
/* css */
import styles from './table.module.css'


/**
  * @function Table
  * @export
  * @description  component : header 
  * @param {array} columns - columns for table
  * @param {object} data - data for table
  * @return {HTMLElement} table component generated HTML
*/
export default function Table({ columns, data }) {
  
     // Use the state and functions returned from useTable to build your UI
     const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
  
      //new
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page
  
      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
  
      state,
      preGlobalFilteredRows,
      setGlobalFilter,
    } = useTable({
        columns,
        initialState: { pageIndex: 0 },
      data,
    },
      useGlobalFilter,
      useSortBy,
      usePagination,  // new
    )

    const { pageIndex } = state

  // Render the UI for your table
  return (
  <>

    <div className={styles.containerFilter}>

         {/* input filter */}
    <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

     

      {/* show items   */}
      <div className={styles.containerShow}>
        <p className={styles.pShow}>Show </p>
        <select id="show"
            value={state.pageSize}
            onChange={e => {
                setPageSize(Number(e.target.value))
            }}
          >
            {[10, 25, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
        </select> 
        <p className={styles.pShow}>entries </p>     
      </div>
      


    </div>

   
    <table {...getTableProps()} border="1">
    <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' ▼'
                        : ' ▲'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {  // replace row with page
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
     {/* pagination */}
     <div className={styles.containerFilter}>
      <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span className={styles.showing}>
            Showing{' '}
            <strong>
              {state.pageIndex + 1} 
            </strong>
            {'  '} to   {pageOptions.length} {'  '} page
            {'  '} of {'  '}  {preGlobalFilteredRows.length} entries
          </span>
        </div>

        <span className={styles.containerGoTo}>
              <label htmlFor="goto">Go to page: </label>
              <input
                id="goto"
                type="number"
                min="1"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "50px" }}
              />
        </span>
      </div>   
    </>  
  )
}
Table.prototype = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
}
import React from "react"
import { useTable, useGlobalFilter, useSortBy, usePagination   } from 'react-table' 
import GlobalFilter from "./GlobalFilter"
import './table.css'


export default function Table({ columns, data }) {
  
     // Use the state and functions returned from useTable to build your UI
     const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, 
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
      usePagination,  
    )

    const { pageIndex } = state

  // Render the UI for your table
  return (
  <>

	{/* search compoent */}
    <div className="containerFilter">

         {/* input filter */}
    <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

     

      {/* show items   */}
      <div className="containerShow">
        <p className="pShow">Show </p>
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
        <p className="pShow">entries </p>     
      </div>
    </div>

   {/* main table */}
    <table {...getTableProps()} border="1">
	{/* header of table */}
    <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* sorting direction indicator */}
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
	
	{/* main contents of table (loop over rows) */}
      <tbody {...getTableBodyProps()}>
      {page.map((row, i) => {  
          prepareRow(row);
		  console.log("---------",row.cells.map(cell => cell.render("Cell")))
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

	{/* Pagination */}
     <div className="containerFilter">
      <div className="pagination">
			{/* button to go back and forth */}
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
          <span className="showing">
            Showing{' '}
            <strong>
              {state.pageIndex + 1} 
            </strong>
            {'  '} to   {pageOptions.length} {'  '} page
            {'  '} of {'  '}  {preGlobalFilteredRows.length} entries
          </span>
        </div>

		{/* go to page field */}
        <span className="containerGoTo">
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

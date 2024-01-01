import { Table as TableType, flexRender } from '@tanstack/react-table'
import { useContext } from 'react'
import tw from 'tailwind-styled-components'
import { DataTableProps } from '.'
import { ScrollArea, ScrollBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../..'
import { TableContext } from '../context/table.context'
import { TableBodyLoading } from './table-body-loading'
import { TableCellHead } from './table-cell-head'

interface TableProps<TData, TValue> extends Omit<DataTableProps<TData, TValue>, 'data'>, React.AllHTMLAttributes<HTMLTableElement> {
   table: TableType<TData>
}

export default function TableDataGrid<TData, TValue>({ table, columns, loading, ...props }: TableProps<TData, TValue>) {
   const { handleScroll } = useContext(TableContext)

   return (
      <TableWrapper className='group w-full shadow'>
         <ScrollArea className='h-[60vh]' onWheel={handleScroll}>
            <Table {...props}>
               <TableHeader className='!sticky top-0 z-50'>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id} className='sticky top-0 hover:bg-background'>
                        {headerGroup.headers.map((header) => (
                           <TableHead className='border-collapse whitespace-nowrap border-b p-0' key={header.id} colSpan={header.colSpan}>
                              <TableCellHead table={table} header={header} />
                           </TableHead>
                        ))}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {loading ? (
                     <TableBodyLoading prepareRows={10} prepareCols={columns.length} />
                  ) : (
                     table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                           ))}
                        </TableRow>
                     ))
                  )}
               </TableBody>
            </Table>
            <ScrollBar orientation='horizontal' />
         </ScrollArea>
      </TableWrapper>
   )
}

const TableWrapper = tw.div`relative flex flex-col items-stretch h-full max-w-full mx-auto overflow-clip rounded-lg border`

TableDataGrid.displayName = 'DataTable'

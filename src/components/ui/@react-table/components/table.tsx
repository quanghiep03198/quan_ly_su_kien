import { Table as TableType, flexRender } from '@tanstack/react-table'
import { useContext } from 'react'
import tw from 'tailwind-styled-components'
import { DataTableProps } from '.'
import { Box, Icon, ScrollArea, ScrollBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../..'
import { TableContext } from '../context/table.context'
import { TableBodyLoading } from './table-body-loading'
import { TableCellHead } from './table-cell-head'
import { cn } from '@/common/utils/cn'
import ColumnResizer from './column-resizer'

interface TableProps<TData, TValue> extends Omit<DataTableProps<TData, TValue>, 'data' | 'slot'>, React.AllHTMLAttributes<HTMLTableElement> {
   table: TableType<TData>
}

export default function TableDataGrid<TData, TValue>({ table, columns, loading, ...props }: TableProps<TData, TValue>) {
   const { handleScroll } = useContext(TableContext)

   return (
      <TableWrapper className='group w-full shadow'>
         <ScrollArea className={cn({ 'h-[60vh]': table.getRowModel().rows.length >= 10 })} onWheel={handleScroll}>
            <Table
               className='border-separate border-spacing-0'
               style={{
                  width: table.getCenterTotalSize(),
                  minWidth: '100%'
               }}
               {...props}
            >
               <TableHeader className='!sticky top-0 z-10 border-b'>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id} className='sticky top-0 hover:bg-background'>
                        {headerGroup.headers.map((header) => (
                           <TableHead
                              className='relative whitespace-nowrap border-b p-0'
                              {...{
                                 key: header.id,
                                 colSpan: header.colSpan,
                                 style: {
                                    width: header.getSize()
                                 }
                              }}
                           >
                              <TableCellHead table={table} header={header} />
                              {table.options.enableColumnResizing && <ColumnResizer header={header} />}
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
         {table.getRowModel().rows.length === 0 && (
            <Box className='flex h-[25vh] w-full items-center justify-center'>
               <Box className='flex items-center justify-center gap-x-2 text-muted-foreground'>
                  <Icon name='PackageOpen' strokeWidth={1} size={32} /> Không có dữ liệu
               </Box>
            </Box>
         )}
      </TableWrapper>
   )
}

const TableWrapper = tw.div`relative flex flex-col items-stretch h-full max-w-full mx-auto overflow-clip rounded-lg border`

TableDataGrid.displayName = 'DataTable'

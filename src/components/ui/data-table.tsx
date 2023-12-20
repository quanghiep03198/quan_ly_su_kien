import { ColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import tw from 'tailwind-styled-components'
import { Box, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '.'

declare type DataItemType = {
   [key: string]: string | number | boolean | null | undefined | Record<string, any>
}

declare type DataTableProps = {
   data: Array<DataItemType>
   columns: Array<ReturnType<ColumnHelper<any>['accessor']>>
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
   data ??= []

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      debugTable: import.meta.env.VITE_NODE_ENV === 'development'
   })

   return (
      <Box className='flex flex-col items-stretch overflow-auto scrollbar-thin'>
         <Table>
            <TableHeader className='sticky top-0 z-50 bg-background'>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => (
                        <TableHead>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                     ))}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                     {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                     ))}
                  </TableRow>
               ))}
            </TableBody>
            <TableFooter>
               <TableRow>
                  <TableCell colSpan={columns.length}></TableCell>
               </TableRow>
            </TableFooter>
         </Table>
      </Box>
   )
}

const Pagination = tw.div`bg-gray-100 dark:bg-gray-950 p-3`

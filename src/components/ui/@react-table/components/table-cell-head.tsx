import { Header, SortDirection, Table, flexRender } from '@tanstack/react-table'
import { Box, Icon } from '../..'
import { cn } from '@/common/utils/cn'
import { ColumnFilter } from './column-filter'

type TableCellHeadProps<TData, TValue> = {
   header: Header<TData, TValue>
   table: Table<TData>
}
type ColumnSortingProps = { isSorted: false | SortDirection; enableSorting?: boolean }

function TableCellHead<TData, TValue>({ header }: TableCellHeadProps<TData, TValue>) {
   return (
      <Box className='flex flex-col items-stretch border-b-[0.25px]'>
         <Box
            className={cn('inline-flex cursor-auto select-none items-center gap-x-2 border-b p-2')}
            onClick={() => {
               if (header.column.columnDef.enableSorting) {
                  header.column.toggleSorting(header.column.getIsSorted() === 'asc')
               }
            }}
         >
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            <SortStatus enableSorting={header.column.columnDef.enableSorting} isSorted={header.column.getIsSorted()} />
         </Box>
         <ColumnFilter column={header.column} />
      </Box>
   )
}

function SortStatus({ isSorted, enableSorting }: ColumnSortingProps) {
   if (!enableSorting) return null
   return <Icon name={isSorted === 'asc' ? 'ArrowDown' : isSorted === 'desc' ? 'ArrowUp' : 'ArrowUpDown'} />
}

export { TableCellHead }

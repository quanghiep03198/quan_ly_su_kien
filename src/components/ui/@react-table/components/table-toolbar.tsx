import React, { useContext } from 'react'
import { Box, Button, Icon, Toggle } from '../..'
import { GlobalFilter } from './global-filter'
import { Table } from '@tanstack/react-table'
import { TableViewOptions } from './table-view-options'
import Tooltip from '../../@override/tooltip'
import { cn } from '@/common/utils/cn'
import { TableContext } from '../context/table.context'

type TableToolbarProps<TData> = {
   table: Table<TData>
   globalFilter: string
   isFiltered: boolean
   onGlobalFilterChange: React.Dispatch<React.SetStateAction<string>>
   onClearAllFilters: () => void
}

export function TableToolbar<TData>({ table, globalFilter, isFiltered, onGlobalFilterChange, onClearAllFilters }: TableToolbarProps<TData>) {
   const { isFilterOpened, setIsFilterOpened } = useContext(TableContext)

   return (
      <Box className='flex items-center justify-between'>
         <GlobalFilter table={table} globalFilter={globalFilter} onGlobalFilterChange={onGlobalFilterChange} />

         <Box className='flex items-center gap-x-2'>
            <Tooltip content='Xóa lọc'>
               <Button variant='outline' size='sm' onClick={onClearAllFilters} className={cn('inline-flex items-center gap-x-2', { hidden: isFiltered })}>
                  <Icon name='FilterX' /> Xóa lọc
               </Button>
            </Tooltip>
            <Tooltip content={isFilterOpened ? 'Đóng bộ lọc' : 'Mở bộ lọc'}>
               <Toggle
                  variant='outline'
                  pressed={isFilterOpened}
                  onPressedChange={() => setIsFilterOpened(!isFilterOpened)}
                  size='sm'
                  className='gap-x-2 text-xs'
               >
                  <Icon name={isFilterOpened ? 'FoldVertical' : 'UnfoldVertical'} /> Bộ lọc
               </Toggle>
            </Tooltip>
            <TableViewOptions table={table} />
         </Box>
      </Box>
   )
}

export default TableToolbar

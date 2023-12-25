import React from 'react'
import { Box, Button, Icon } from '../..'
import { GlobalFilter } from './global-filter'
import { Table } from '@tanstack/react-table'
import { TableViewOptions } from './table-view-options'
import Tooltip from '../../@override/tooltip'
import { cn } from '@/common/utils/cn'

type TableToolbarProps<TData> = {
   table: Table<TData>
   globalFilter: string
   isFiltered: boolean
   onGlobalFilterChange: React.Dispatch<React.SetStateAction<string>>
   onClearAllFilters: () => void
}

export function TableToolbar<TData>({ table, globalFilter, isFiltered, onGlobalFilterChange, onClearAllFilters }: TableToolbarProps<TData>) {
   return (
      <Box className='flex items-center justify-between'>
         <Box className='flex items-center gap-x-2'>
            <GlobalFilter table={table} globalFilter={globalFilter} onGlobalFilterChange={onGlobalFilterChange} />
         </Box>
         <Box className='flex items-center gap-x-2'>
            <Tooltip content='Xóa lọc'>
               <Button variant='outline' size='sm' onClick={onClearAllFilters} className={cn('inline-flex items-center gap-x-2', { hidden: isFiltered })}>
                  <Icon name='FilterX' /> Xóa lọc
               </Button>
            </Tooltip>
            <TableViewOptions table={table} />
         </Box>
      </Box>
   )
}

export default TableToolbar

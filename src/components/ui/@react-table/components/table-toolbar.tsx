import { Table } from '@tanstack/react-table'
import React, { useContext } from 'react'
import { Box, Button, Icon, Toggle } from '../..'
import Tooltip from '../../@override/tooltip'
import { TableContext } from '../context/table.context'
import { GlobalFilter, GlobalFilterPopover } from './global-filter'
import { TableViewOptions } from './table-view-options'

type TableToolbarProps<TData> = {
   table: Table<TData>
   globalFilter: string
   isFiltered: boolean
   onGlobalFilterChange: React.Dispatch<React.SetStateAction<string>>
   onClearAllFilters: () => void
   slot?: React.ReactNode
}

export function TableToolbar<TData>(props: TableToolbarProps<TData>) {
   const { table, globalFilter, isFiltered, slot, onGlobalFilterChange, onClearAllFilters } = props
   const { isFilterOpened, setIsFilterOpened } = useContext(TableContext)

   return (
      <Box className='flex items-center justify-between sm:justify-end'>
         <GlobalFilter table={table} globalFilter={globalFilter} onGlobalFilterChange={onGlobalFilterChange} />
         <Box className='flex items-center gap-x-2'>
            {isFiltered && (
               <Tooltip content='Xóa lọc'>
                  <Button variant='destructive' size='icon' onClick={onClearAllFilters} className='h-8 w-8'>
                     <Icon name='XCircle' />
                  </Button>
               </Tooltip>
            )}
            <GlobalFilterPopover table={table} globalFilter={globalFilter} onGlobalFilterChange={onGlobalFilterChange} />
            <Tooltip content={isFilterOpened ? 'Đóng bộ lọc' : 'Mở bộ lọc'}>
               <Toggle
                  variant='outline'
                  pressed={isFilterOpened}
                  onPressedChange={() => setIsFilterOpened(!isFilterOpened)}
                  disabled={!table.getAllColumns().some(({ columnDef }) => columnDef.enableColumnFilter)}
                  size='sm'
               >
                  <Icon name={isFilterOpened ? 'FilterX' : 'Filter'} />
               </Toggle>
            </Tooltip>
            <TableViewOptions table={table} />
            {slot}
         </Box>
      </Box>
   )
}

export default TableToolbar

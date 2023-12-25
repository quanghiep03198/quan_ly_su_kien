import { Table } from '@tanstack/react-table'
import { useEffect } from 'react'
import { Box, Icon } from '../..'
import { DebouncedInput } from './debounced-input'

type GlobalFilterProps<T> = {
   table: Table<T>
   globalFilter: string | undefined
   onGlobalFilterChange: React.Dispatch<React.SetStateAction<string>>
}

export function GlobalFilter<T>(props: GlobalFilterProps<T>) {
   useEffect(() => {
      if (props.table.getState().columnFilters[0]?.id === 'fullName') {
         if (props.table.getState().sorting[0]?.id !== 'fullName') {
            props.table.setSorting([{ id: 'fullName', desc: false }])
         }
      }
   }, [props.table.getState().columnFilters[0]?.id])

   return (
      <Box className='relative w-fit'>
         <Icon name='Search' className='absolute left-2 top-1/2 -translate-y-1/2' />
         <DebouncedInput
            value={props.globalFilter ?? ''}
            onChange={(value) => props.onGlobalFilterChange(String(value))}
            className='font-lg border-block border p-2 pl-8 shadow'
            placeholder='Tìm kiếm ...'
         />
      </Box>
   )
}

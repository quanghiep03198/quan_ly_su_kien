import { cn } from '@/common/utils/cn'
import { Column } from '@tanstack/react-table'
import { useContext, useMemo } from 'react'
import { Box, DropdownSelect, buttonVariants } from '../..'
import { TableContext } from '../context/table.context'
import { DebouncedInput } from './debounced-input'
import { ComboboxFilter } from './combobox-filter'

type ColumnFilterProps<TData, TValue> = {
   column: Column<TData, TValue>
}

export function ColumnFilter<TData, TValue>({ column }: ColumnFilterProps<TData, TValue>) {
   const { isScrolling, areAllFiltersCleared } = useContext(TableContext)

   const filterType = column.columnDef.filterFn
   const columnFilterValue = column.getFilterValue()

   const sortedUniqueValues = useMemo(
      () => (filterType === 'inNumberRange' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
      [column.getFacetedUniqueValues()]
   )

   if (!column.columnDef.enableColumnFilter) return <Box className='h-9 w-full' />

   switch (filterType) {
      case 'inNumberRange':
         return (
            <Box>
               <Box className='flex items-stretch'>
                  <DebouncedInput
                     type='number'
                     className={cn(buttonVariants({ variant: 'ghost' }), 'rounded-none border-none text-xs')}
                     min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                     max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                     value={(areAllFiltersCleared ? '' : (columnFilterValue as [number, number]))?.[0] ?? ''}
                     onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
                     placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
                  />
                  <DebouncedInput
                     type='number'
                     className={cn(buttonVariants({ variant: 'ghost' }), 'rounded-none border-none text-xs')}
                     min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
                     max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
                     value={(areAllFiltersCleared ? '' : (columnFilterValue as [number, number]))?.[1] ?? ''}
                     onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
                     placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
                  />
               </Box>
            </Box>
         )

      case 'equals':
         return (
            <DropdownSelect
               className='min-w-[8rem] rounded-none border-none text-xs shadow-none focus:border-none'
               placeholder='Chọn ...'
               options={sortedUniqueValues.map((value: any) => ({
                  label: value,
                  value: value
               }))}
               onChange={(value) => column.setFilterValue(value)}
            />
         )

      default:
         return (
            <ComboboxFilter
               areAllFiltersCleared={areAllFiltersCleared}
               placeholder='Tìm kiếm trong cột ...'
               forceClose={isScrolling}
               options={sortedUniqueValues.slice(0, 1000).map((value: any) => ({
                  label: value,
                  value: value
               }))}
               className='w-56 rounded-none border-none text-xs shadow-none'
               onChange={(value) => column.setFilterValue(value)}
            />
         )
   }
}

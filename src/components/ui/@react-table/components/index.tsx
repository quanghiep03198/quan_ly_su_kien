import { PaginationHandler } from '@/common/hooks/use-server-pagination'
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   TableOptions,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'
import { Box } from '../..'
import { TableProvider } from '../context/table.context'
import { fuzzyFilter } from '../utils/fuzzy-filter.util'
import TableDataGrid from './table'
import TablePagination from './table-pagination'
import TableToolbar from './table-toolbar'

export interface DataTableProps<TData, TValue> {
   data: Array<TData>
   columns: Array<ColumnDef<TData, TValue>>
   loading: boolean
   manualPagination?: boolean
   paginationState?: Omit<Pagination<TData>, 'docs'>
   onManualPaginate?: PaginationHandler
}

export function DataTable<TData, TValue>({ data, columns, loading, manualPagination, paginationState, onManualPaginate }: DataTableProps<TData, TValue>) {
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
   const [sorting, setSorting] = useState<SortingState>([])
   const [globalFilter, setGlobalFilter] = useState<string>('')

   const table = useReactTable({
      data: data ?? [],
      columns,
      state: {
         sorting,
         columnFilters,
         globalFilter
      },
      manualPagination,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: fuzzyFilter,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      debugTable: import.meta.env.VITE_NODE_ENV === 'development'
   } as TableOptions<TData>)

   const clearAllFilter = () => {
      setGlobalFilter('')
      setColumnFilters([])
   }

   return (
      <TableProvider areAllFiltersCleared={columnFilters.length === 0 && globalFilter.length === 0}>
         <Box className='flex h-full flex-col items-stretch gap-y-4'>
            <TableToolbar
               table={table}
               isFiltered={globalFilter.length === 0 && columnFilters.length === 0}
               globalFilter={globalFilter}
               onGlobalFilterChange={setGlobalFilter}
               onClearAllFilters={clearAllFilter}
            />
            <TableDataGrid table={table} columns={columns} loading={loading} />
            <TablePagination table={table} manualPagination={Boolean(manualPagination)} onManualPaginate={onManualPaginate} {...paginationState} />
         </Box>
      </TableProvider>
   )
}

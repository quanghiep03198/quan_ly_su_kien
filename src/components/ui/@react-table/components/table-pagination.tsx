import { Table } from '@tanstack/react-table'
import { Box, Button, Icon, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../..'
import { PaginationActions, PaginationHandler } from '@/common/hooks/use-server-pagination'

type DataTablePaginationProps<TData> = {
   table: Table<TData>
   manualPagination: boolean
   onManualPaginate: PaginationHandler | undefined
} & Partial<Pagination<TData>>

export default function TablePagination<TData>({
   table,
   manualPagination,
   onManualPaginate: dispatch,
   hasNextPage,
   hasPrevPage,
   page,
   pagingCounter
}: DataTablePaginationProps<TData>) {
   const canNextPage = manualPagination ? hasNextPage : table.getCanNextPage()
   const canPreviousPage = manualPagination ? hasPrevPage : table.getCanPreviousPage()

   const gotoFirstPage = () => {
      manualPagination && dispatch ? dispatch({ type: PaginationActions.GO_TO_FIRST_PAGE }) : table.setPageIndex(0)
   }
   const gotoPreviousPage = () => {
      manualPagination && dispatch ? dispatch({ type: PaginationActions.GO_TO_PREV_PAGE }) : table.previousPage()
   }
   const gotoNextPage = () => {
      manualPagination && dispatch ? dispatch({ type: PaginationActions.GO_TO_NEXT_PAGE }) : table.nextPage()
   }
   const gotoLastPage = () => {
      manualPagination && dispatch
         ? dispatch({
              type: PaginationActions.GO_TO_LAST_PAGE,
              payload: pagingCounter as number
           })
         : table.setPageIndex(table.getPageCount() - 1)
   }
   const changePageSize = (value: number) => {
      if (manualPagination && page && pagingCounter && dispatch) {
         if (page >= pagingCounter) gotoPreviousPage()
         dispatch({
            type: PaginationActions.CHANGE_PAGE_SIZE,
            payload: value
         })
         return
      }

      table.setPageSize(value)
   }

   return (
      <Box className='flex items-center justify-between py-2'>
         <Box className='flex-1 text-sm text-muted-foreground'>
            {table.getFilteredSelectedRowModel().rows.length} / {table.getFilteredRowModel().rows.length} hàng được chọn.
         </Box>
         <Box className='flex items-center space-x-6 lg:space-x-8'>
            <Box className='flex items-center space-x-2'>
               <p className='text-sm font-medium'>Hiển thị</p>
               <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                     changePageSize(+value)
                  }}
               >
                  <SelectTrigger className='h-8 w-[70px]'>
                     <SelectValue placeholder={table.getState().pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side='top'>
                     {[10, 20, 30, 40, 50].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                           {pageSize}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </Box>
            <Box className='flex w-[100px] items-center justify-center text-sm font-medium'>
               Trang {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </Box>
            <Box className='flex items-center space-x-2'>
               <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={gotoFirstPage} disabled={!canPreviousPage}>
                  <span className='sr-only'>Go to first page</span>
                  <Icon name='ChevronsLeft' />
               </Button>
               <Button variant='outline' className='h-8 w-8 p-0' onClick={gotoLastPage} disabled={!canPreviousPage}>
                  <span className='sr-only'>Go to previous page</span>
                  <Icon name='ChevronLeft' />
               </Button>
               <Button variant='outline' className='h-8 w-8 p-0' onClick={gotoNextPage} disabled={!canNextPage}>
                  <span className='sr-only'>Go to next page</span>
                  <Icon name='ChevronRight' />
               </Button>
               <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={gotoLastPage} disabled={!canNextPage}>
                  <span className='sr-only'>Go to last page</span>
                  <Icon name='ChevronsRight' />
               </Button>
            </Box>
         </Box>
      </Box>
   )
}

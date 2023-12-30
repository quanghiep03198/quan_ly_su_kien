import { PaginationActions, PaginationHandler } from '@/common/hooks/use-server-pagination'
import { EventType } from '@/common/types/entities'
import { Box, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

type EventBoardPaginationProps = {
   onPaginate: PaginationHandler
} & Omit<Pagination<EventType>, 'docs'>

const EventBoardPagination: React.FC<EventBoardPaginationProps> = (props) => {
   const [params, setParams] = useSearchParams()

   const gotoFirstPage = () => {
      props.onPaginate({ type: PaginationActions.GO_TO_FIRST_PAGE })
      setParams((param) => {
         param.set('page', '1')
         return param
      })
   }

   const gotoLastPage = () => {
      props.onPaginate({ type: PaginationActions.GO_TO_LAST_PAGE, payload: props.totalPages })
      setParams((param) => {
         param.set('page', String(props.totalPages))
         return param
      })
   }

   return (
      <Box className='mx-auto flex w-full max-w-full items-center justify-center'>
         <Pagination>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious onClick={gotoFirstPage} />
               </PaginationItem>
               <PaginationItem>
                  <PaginationLink href='/?page=1'>1</PaginationLink>
               </PaginationItem>
               <PaginationItem>
                  <PaginationEllipsis />
               </PaginationItem>
               <PaginationItem>
                  <PaginationNext href='#2' />
               </PaginationItem>
            </PaginationContent>
         </Pagination>
      </Box>
   )
}

export default EventBoardPagination

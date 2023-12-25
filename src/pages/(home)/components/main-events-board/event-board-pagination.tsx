import { Box, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui'
import React from 'react'

type EventBoardPaginationProps = {}

const EventBoardPagination: React.FC<EventBoardPaginationProps> = (_props) => {
   return (
      <Box className='mx-auto flex w-full max-w-full items-center justify-center'>
         <Pagination>
            <PaginationContent>
               <PaginationItem>
                  <PaginationPrevious href='#1' />
               </PaginationItem>
               <PaginationItem>
                  <PaginationLink href='#1'>1</PaginationLink>
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

import useQueryParams from '@/common/hooks/use-query-params'
import { calculatePaginationRange } from '@/common/utils/calculate-pagination-range'
import { cn } from '@/common/utils/cn'
import { Box, Button, Icon, buttonVariants } from '@/components/ui'
import _ from 'lodash'
import * as qs from 'qs'
import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import tw from 'tailwind-styled-components'

type PaginationProps = Pick<Pagination<unknown>, 'page' | 'totalPages' | 'hasNextPage' | 'hasPrevPage'> & { onPrefetch?: () => void }

const Pagination: React.FC<PaginationProps> = (props) => {
   const { page, totalPages, hasNextPage, hasPrevPage, onPrefetch: handlePrefetch } = props
   const navigate = useNavigate()
   const [params] = useQueryParams()
   const currentPage = params.page ? Number(params.page) : 1
   const paginationRange = calculatePaginationRange(page, totalPages)

   return (
      <Box className='mx-auto flex w-full max-w-full items-center justify-center gap-x-2'>
         <Button disabled={!hasPrevPage} variant='ghost' className='gap-x-2' onClick={() => navigate({ search: qs.stringify({ page: page - 1 }) })}>
            <Icon name='ChevronLeft' /> Previous
         </Button>
         {paginationRange.map((pageIndex, index) => {
            if (index === paginationRange.length - 1 && pageIndex < totalPages) return <PaginationElipsis>...</PaginationElipsis>
            return (
               <Link
                  key={pageIndex}
                  to={{ search: qs.stringify({ page: pageIndex }) }}
                  className={cn(buttonVariants({ variant: page == pageIndex ? 'outline' : 'ghost', size: 'icon' }))}
               >
                  {pageIndex}
               </Link>
            )
         })}
         <Button
            variant='ghost'
            disabled={!hasNextPage}
            className='flex-row-reverse gap-x-2'
            onClick={() => navigate({ search: qs.stringify({ page: page + 1 }) })}
            onMouseEnter={() => {
               if (handlePrefetch) handlePrefetch()
            }}
         >
            <Icon name='ChevronRight' /> Next
         </Button>
      </Box>
   )
}

const PaginationElipsis = tw.span`tracking-widest text-lg text-foreground`

export default Pagination

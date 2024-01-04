import { EventType } from '@/common/types/entities'
import { calculatePaginationRange } from '@/common/utils/calculate-pagination-range'
import { cn } from '@/common/utils/cn'
import { Box, Button, Icon, buttonVariants } from '@/components/ui'
import * as qs from 'qs'
import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import tw from 'tailwind-styled-components'

type PaginationProps = Pick<Pagination<EventType>, 'page' | 'totalPages' | 'hasNextPage' | 'hasPrevPage'> & { onPrefetch?: () => void }

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, hasNextPage, hasPrevPage, onPrefetch }) => {
   const navigate = useNavigate()
   const [params] = useSearchParams()
   const currentPage = params.get('page') ? Number(params.get('page')) : 1

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
                  className={cn(buttonVariants({ variant: page == currentPage ? 'outline' : 'ghost', size: 'icon' }))}
               >
                  {pageIndex}
               </Link>
            )
         })}
         <Button
            variant='ghost'
            disabled={!hasNextPage}
            className='gap-x-2'
            onMouseEnter={() => {
               if (onPrefetch) onPrefetch()
            }}
            onClick={() => navigate({ search: qs.stringify({ page: page + 1 }) })}
         >
            Next <Icon name='ChevronRight' />
         </Button>
      </Box>
   )
}

const PaginationElipsis = tw.span`tracking-widest text-lg text-foreground`

export default Pagination

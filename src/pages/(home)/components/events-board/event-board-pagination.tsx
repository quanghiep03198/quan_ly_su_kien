import { EventType } from '@/common/types/entities'
import { calculatePaginationRange } from '@/common/utils/calculate-pagination-range'
import { cn } from '@/common/utils/cn'
import { Button, Icon, buttonVariants } from '@/components/ui'
import * as qs from 'qs'
import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import tw from 'tailwind-styled-components'

type PaginationProps = Pick<Pagination<EventType>, 'page' | 'totalPages' | 'hasNextPage' | 'hasPrevPage'>

const EventBoardPagination: React.FC<PaginationProps> = ({ page, totalPages, hasNextPage, hasPrevPage }) => {
   const navigate = useNavigate()
   const paginationRange = calculatePaginationRange(page, totalPages)

   return (
      <Pagination>
         <Button disabled={!hasPrevPage} variant='ghost' className='gap-x-2' onClick={() => navigate({ search: qs.stringify({ page: page - 1 }) })}>
            <Icon name='ChevronLeft' /> Trang trước
         </Button>
         {paginationRange.map((pageIndex, index) => {
            if (index === paginationRange.length - 1 && pageIndex < totalPages) return <PaginationElipsis>...</PaginationElipsis>
            return <PaginationItem page={pageIndex} />
         })}
         <Button variant='ghost' disabled={!hasNextPage} className='gap-x-2' onClick={() => navigate({ search: qs.stringify({ page: page + 1 }) })}>
            Trang tiếp <Icon name='ChevronRight' />
         </Button>
      </Pagination>
   )
}

const Pagination = tw.div`mx-auto flex w-full max-w-full items-center justify-center gap-x-2`
const PaginationElipsis = tw.span`tracking-widest text-lg text-foreground`

const PaginationItem: React.FC<{ page: string | number }> = ({ page }) => {
   const [params] = useSearchParams()
   const currentPage = Boolean(params.get('page')) ? Number(params.get('page')) : 1

   return (
      <Link to={{ search: qs.stringify({ page: page }) }} className={cn(buttonVariants({ variant: page == currentPage ? 'outline' : 'ghost', size: 'icon' }))}>
         {page}
      </Link>
   )
}

export default EventBoardPagination

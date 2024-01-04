/* eslint-disable */

import useQueryParams from '@/common/hooks/use-query-params'
import { EventType } from '@/common/types/entities'
import { Box, Icon, Typography } from '@/components/ui'
import Pagination from '@/components/ui/@custom/pagination'
import { useGetEventsQuery, usePrefetch } from '@/redux/apis/event.api'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { EmptySection, EventList } from '../components/shared/list-sections'
import Loading from '../components/shared/loading'

const MyEvents = () => {
   const [searchValue] = useState<string>('')
   const [sortValue] = useState<string>('')
   const params = useQueryParams('page')
   const currentPage = useMemo(() => (params.page ? Number(params.page) : 1), [params])
   const { data, isLoading } = useGetEventsQuery({
      page: currentPage,
      limit: 12,
      search: searchValue,
      sort: sortValue
   })
   const prefetchNextPage = usePrefetch('getEvents')
   const eventsList = useMemo(() => data as Pagination<EventType>, [data])

   const handlePrefetchNextPage = useCallback(() => {
      if (eventsList.hasNextPage) prefetchNextPage({ page: currentPage + 1 })
   }, [prefetchNextPage, params])

   return (
      <Box className='mx-auto max-w-7xl space-y-10 py-20 sm:p-2 md:p-2'>
         <Box className='space-y-4'>
            <Typography variant='heading6' className='inline-flex items-center gap-x-2 text-primary'>
               <Icon name='Newspaper' /> Tin tức sự kiện
            </Typography>
            {isLoading ? (
               <Loading />
            ) : Array.isArray(eventsList?.docs) && eventsList?.docs.length === 0 ? (
               <EmptySection />
            ) : (
               <EventList data={eventsList?.docs} />
            )}
         </Box>

         <Pagination {..._.omit(eventsList, ['docs'])} onPrefetch={handlePrefetchNextPage} />
      </Box>
   )
}

export default MyEvents

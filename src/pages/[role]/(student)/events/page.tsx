/* eslint-disable */

import useQueryParams from '@/common/hooks/use-query-params'
import { EventType } from '@/common/types/entities'
import { Box, Icon, Typography } from '@/components/ui'
import Pagination from '@/components/ui/@custom/pagination'
import { useGetEventsQuery, usePrefetch } from '@/redux/apis/event.api'
import _ from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { EventVerticalCard } from '../components/shared/event-card'
import { EmptySection } from '../components/shared/empty-section'
import Loading from '../components/shared/loading'
import SearchBox from '../components/shared/search-box'

const EventsBoard: React.FunctionComponent = () => {
   const [searchValue, setSearchValue] = useState<string>('')
   const [sortValue, setSortValue] = useState<string>('')
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
      <Box className='mx-auto max-w-7xl space-y-20 px-4 py-10 xl:px-0'>
         <SearchBox onSearchValueChange={setSearchValue} onSortChange={setSortValue} />
         <Box className='space-y-4'>
            <Typography variant='heading6' className='inline-flex items-center gap-x-2 text-primary'>
               <Icon name='Newspaper' /> Tin tức sự kiện
            </Typography>
            {isLoading ? (
               <Loading />
            ) : Array.isArray(eventsList?.docs) && eventsList?.docs.length === 0 ? (
               <EmptySection />
            ) : (
               <Box className='grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-2 md:md:grid-cols-3 xl:gap-x-6'>
                  {eventsList?.docs?.map((item) => <EventVerticalCard key={item.id} data={item} />)}
               </Box>
            )}
         </Box>
         <Pagination {..._.pick(eventsList, ['page', 'totalPages', 'hasNextPage', 'hasPrevPage'])} onPrefetch={handlePrefetchNextPage} />
      </Box>
   )
}

// #region Child components

// #endregion

export default EventsBoard

import { EventType } from '@/common/types/entities'
import { Box, Icon, Typography } from '@/components/ui'
import { useGetEventsQuery } from '@/redux/apis/event.api'
import _ from 'lodash'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Pagination from './components/events-board/event-board-pagination'
import EventCard from './components/events-board/event-card'
import SearchBox from './components/events-board/search-box'
import Loading from './loading'

const EventsBoard: React.FunctionComponent = () => {
   const [searchValue, setSearchValue] = useState<string>('')
   const [params] = useSearchParams()
   const { data, isLoading } = useGetEventsQuery({ page: Boolean(params.get('page')) ? Number(params.get('page')) : 1, limit: 6, search: searchValue })

   return (
      <Box className='mx-auto max-w-7xl space-y-20 px-4 py-10 xl:px-0'>
         <SearchBox onSearchValueChange={setSearchValue} />
         <Box className='space-y-4'>
            <Typography variant='heading6' className='inline-flex items-center gap-x-2 text-primary'>
               <Icon name='Newspaper' /> Tin tức sự kiện
            </Typography>
            {isLoading ? <Loading /> : Array.isArray(data?.docs) && data?.docs.length === 0 ? <EmptySection /> : <EventList data={data?.docs} />}
         </Box>
         <Pagination {..._.omit(data, ['docs'])} />
      </Box>
   )
}

// #region Child components
const EventList: React.FC<{ data: Array<EventType> | undefined }> = ({ data }) =>
   Array.isArray(data) &&
   data.length > 0 && (
      <Box className='grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-2 md:md:grid-cols-3'>{data?.map((item) => <EventCard key={item.id} data={item} />)}</Box>
   )

const EmptySection: React.FunctionComponent = () => {
   return (
      <Box className='flex min-h-[24rem] w-full flex-col items-center justify-center gap-6 text-center text-muted-foreground'>
         <Icon name='PackageOpen' size={48} className='text-muted-foreground' />
         Chưa có sự kiện nào
      </Box>
   )
}
// #endregion

export default EventsBoard

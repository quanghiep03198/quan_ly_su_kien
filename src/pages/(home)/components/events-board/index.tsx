import useServerPagination from '@/common/hooks/use-server-pagination'
import { Box, Icon, Typography } from '@/components/ui'
import { useGetEventsQuery } from '@/redux/apis/event.api'
import Pagination from './event-board-pagination'
import EventCard from './event-card'
import PlaceHolderCard from './event-placeholder-card'
import SearchBox from './search-box'
import _ from 'lodash'
import { EventType } from '@/common/types/entities'

const EventsBoard: React.FunctionComponent = () => {
   const [paginationState, dispatch] = useServerPagination()
   const { data, isLoading } = useGetEventsQuery({ page: paginationState.page, limit: 24 })

   return (
      <Box className='mx-auto max-w-7xl space-y-20 px-4 py-10 xl:px-0'>
         <SearchBox />
         <Box className='space-y-4'>
            <Typography variant='heading6' className='inline-flex items-center gap-x-2 text-primary'>
               <Icon name='Newspaper' /> Tin tức sự kiện
            </Typography>
            {isLoading ? <PlaceholderEventList /> : Array.isArray(data?.docs) && data?.docs.length === 0 ? <EmptySection /> : <EventList data={data?.docs} />}
         </Box>
         <Pagination onPaginate={dispatch} {..._.omit(data, ['docs'])} />
      </Box>
   )
}

const PlaceholderEventList: React.FunctionComponent = () => {
   const preRenderItems = Array.apply(null, Array(12)).map((_, i) => i)
   return (
      <Box className='grid grid-cols-6 gap-x-4 gap-y-6 sm:grid-cols-2 md:md:grid-cols-3'>
         {preRenderItems.map((item) => (
            <PlaceHolderCard key={item} />
         ))}
      </Box>
   )
}

const EventList: React.FC<{ data: Array<EventType> | undefined }> = ({ data }) =>
   Array.isArray(data) &&
   data.length > 0 && (
      <Box className='grid grid-cols-6 gap-x-4 gap-y-6 sm:grid-cols-2 md:md:grid-cols-3'>{data?.map((item) => <EventCard key={item.id} data={item} />)}</Box>
   )

const EmptySection: React.FunctionComponent = () => {
   return (
      <Box className='flex min-h-[24rem] w-full flex-col items-center justify-center gap-6 text-center text-muted-foreground'>
         <Icon name='PackageOpen' size={48} className='text-muted-foreground' />
         Chưa có sự kiện nào
      </Box>
   )
}

export default EventsBoard

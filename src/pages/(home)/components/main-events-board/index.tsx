import { Box, Icon, Typography } from '@/components/ui'
import { useEffect, useState } from 'react'
import { data } from '../../mocks/data'
import EventBoardPagination from './event-board-pagination'
import EventCard from './event-card'
import PlaceHolderCard from './event-placeholder-card'
import SearchBox from './search-box'

const preRenderItems = Array.apply(null, Array(12)).map((_, i) => i)

const EventsBoard: React.FunctionComponent = () => {
   const [loading, setLoading] = useState<boolean>(true)

   useEffect(() => {
      const timeout = setTimeout(() => {
         setLoading(false)
      }, 2000)
      return () => {
         clearTimeout(timeout)
      }
   }, [])

   return (
      <Box className='mx-auto max-w-7xl space-y-10 py-10'>
         <SearchBox />
         <Box className='space-y-4'>
            <Typography variant='heading6' className='inline-flex items-center gap-x-2 text-primary'>
               <Icon name='Newspaper' /> Tin tức sự kiện
            </Typography>
            <Box className='grid grid-cols-4 gap-x-4 gap-y-6'>
               {loading
                  ? preRenderItems.map((item) => <PlaceHolderCard key={item} />)
                  : Array.isArray(data) && data.map((item) => <EventCard key={item.id} data={item} />)}
            </Box>
         </Box>
         <EventBoardPagination />
      </Box>
   )
}

export default EventsBoard

import { EventType } from '@/common/types/entities'
import { Box, Icon } from '@/components/ui'
import EventCard from './event-card'

export const EventList: React.FC<{ data: Array<EventType> | undefined }> = ({ data }) =>
   Array.isArray(data) &&
   data.length > 0 && (
      <Box className='grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-2 md:md:grid-cols-3'>{data?.map((item) => <EventCard key={item.id} data={item} />)}</Box>
   )

export const EmptySection: React.FunctionComponent = () => {
   return (
      <Box className='flex min-h-[24rem] w-full flex-col items-center justify-center gap-6 text-center text-muted-foreground'>
         <Icon name='PackageOpen' size={48} className='text-muted-foreground' />
         Chưa có sự kiện nào
      </Box>
   )
}

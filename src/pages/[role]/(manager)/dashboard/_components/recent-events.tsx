import { EventStatus } from '@/common/constants/enums'
import { EventType } from '@/common/types/entities'
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { useGetEventsQuery } from '@/redux/apis/event.api'

const EventItem: React.FC<{ data: EventType }> = ({ data }) => {
   return (
      <div className='flex items-center'>
         <div className='space-y-1'>
            <p className='text-sm font-medium leading-none'>{data?.name}</p>
            <p className='text-sm text-muted-foreground'>
               {data?.start_time.toString()} - {data?.end_time?.toString()}
            </p>
         </div>
         <div className='ml-auto font-medium'>
            <Badge variant={'success'}>{data.status}</Badge>
         </div>
      </div>
   )
}

export const RecentEvents: React.FunctionComponent = () => {
   const { data } = useGetEventsQuery({ page: 1, limit: 100 })
   return (
      <Card>
         <CardHeader className=''>
            <CardTitle>Sự kiện gần đây</CardTitle>
         </CardHeader>
         <CardContent>
            <div className='space-y-8'>
               {Array.isArray(data?.docs) &&
                  data?.docs
                     .filter((item) => item.status === EventStatus.ACTIVE)
                     .slice(0, 5)
                     .map((item) => <EventItem key={item.id} data={item} />)}
            </div>
         </CardContent>
      </Card>
   )
}

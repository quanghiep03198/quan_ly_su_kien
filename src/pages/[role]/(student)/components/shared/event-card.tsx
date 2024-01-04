import { EventStatusValues } from '@/common/constants/constants'
import { EventStatus, JoinEventStatus } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import { EventType } from '@/common/types/entities'
import { cn } from '@/common/utils/cn'
import { Badge, Box, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, Icon, Image } from '@/components/ui'
import { usePrefetch } from '@/redux/apis/event.api'
import { useAppSelector } from '@/redux/hook'
import { format } from 'date-fns'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FeedbackFormModal from './feedback-form-modal'

type EventCardProps = {
   data: EventType
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
   const prefetchPage = usePrefetch('getEventDetails')
   const [open, setOpen] = useState<boolean>(false)
   const user = useAppSelector((state) => state.auth.user)

   return (
      <>
         <Card className=' w-[288px] overflow-clip transition-transform duration-200 ease-in-out '>
            <CardHeader className='group relative h-52 space-y-0 p-2'>
               <Image src={data?.banner} height={208} width='100%' className='aspect-[16/9] h-full max-w-full rounded-lg object-cover' />
               {data?.status_join === JoinEventStatus.ALREADY && (
                  <Badge variant='success' className='absolute bottom-4 right-4 gap-x-2'>
                     <Icon name='CheckCircle' /> Đã tham gia
                  </Badge>
               )}
            </CardHeader>
            <CardContent className='flex flex-col gap-y-2 px-3 py-2'>
               <Link className='line-clamp-1 font-medium' to='#'>
                  {data?.name}
               </Link>

               <CardDescription className='mb-2 inline-flex items-center space-x-2'>
                  <Icon name='Calendar' />
                  <time>
                     {format(data?.start_time, 'dd/MM/yyyy')} - {format(data?.end_time, 'dd/MM/yyyy')}
                  </time>
               </CardDescription>

               <Badge variant={data?.status == EventStatus.ACTIVE ? 'success' : 'destructive'} className='w-fit'>
                  {EventStatusValues.get(data.status)}
               </Badge>
               <CardDescription className='my-2 line-clamp-2 flex-1'>{data?.description}</CardDescription>
               <Box className='flex items-center justify-between'>
                  <CardDescription className='mb-2 inline-flex items-center space-x-2'>
                     <Icon name='User' />
                     <span>{data?.user?.name}</span>
                  </CardDescription>
                  {data?.status_join === JoinEventStatus.ALREADY && (
                     <Button size='sm' variant='outline' className='gap-x-2 text-xs' onClick={() => setOpen(!open)}>
                        <Icon name='Reply' /> Feedback
                     </Button>
                  )}
               </Box>
            </CardContent>
            <CardFooter className={cn('mt-2 items-stretch gap-x-2 px-3')}>
               <Button asChild size='sm' variant='default' className='w-full' onMouseEnter={() => prefetchPage(String(data?.id))}>
                  <Link to={Paths.EVENTS_DETAILS.replace(':id', String(data?.id))}>Chi tiết</Link>
               </Button>
            </CardFooter>
         </Card>
         {data?.status_join === JoinEventStatus.ALREADY && <FeedbackFormModal open={open} onOpenChange={setOpen} sender={user!} eventId={data?.id!} />}
      </>
   )
}

export default EventCard

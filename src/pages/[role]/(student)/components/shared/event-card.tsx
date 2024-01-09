import { EventStatusValues } from '@/common/constants/constants'
import { EventStatus, JoinEventStatus } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import { EventType } from '@/common/types/entities'
import { cn } from '@/common/utils/cn'
import { Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Icon, Image } from '@/components/ui'
import { usePrefetch } from '@/redux/apis/event.api'
import { useAppSelector } from '@/redux/hook'
import { format } from 'date-fns'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FeedbackFormModal from './feedback-form-modal'

export const EventVerticalCard: React.FC<{
   data: EventType
}> = ({ data }) => {
   const prefetchPage = usePrefetch('getEventDetails')

   return (
      <>
         <Card className='w-full overflow-clip transition-transform duration-200 ease-in-out'>
            <CardHeader className='group relative h-52 space-y-0 p-2'>
               <Image src={data?.banner} height={208} width='100%' className='aspect-[16/9] h-full max-w-full rounded-lg object-cover' />
               {data?.status_join === JoinEventStatus.ALREADY && (
                  <Badge variant='success' className='absolute bottom-4 right-4 gap-x-2'>
                     <Icon name='CheckCircle' /> Đã tham gia
                  </Badge>
               )}
            </CardHeader>
            <CardContent className='grid gap-y-2 px-3 py-2'>
               <Link className='line-clamp-1 font-medium' to='#'>
                  {data?.name}
               </Link>

               <CardDescription className='mb-2 inline-flex items-center space-x-2'>
                  <Icon name='Calendar' />
                  <time>
                     {format(data?.start_time, 'dd/MM/yyyy')} - {format(data?.end_time, 'dd/MM/yyyy')}
                  </time>
               </CardDescription>
               <CardDescription className='mb-2 flex items-center space-x-2'>
                  <Icon name='User' className='basis-4' />
                  <span className='line-clamp-1'>{data?.user?.name}</span>
               </CardDescription>
               <Badge variant={data?.status === EventStatus.ACTIVE ? 'success' : 'destructive'} className='w-fit'>
                  {EventStatusValues.get(data.status)}
               </Badge>
               <CardDescription className='row-span-2 my-2 line-clamp-2 min-h-[2.25rem] flex-1 leading-tight sm:line-clamp-1 '>
                  {data?.description}
               </CardDescription>
            </CardContent>
            <CardFooter className={cn('mt-2 items-stretch gap-x-2 px-3')}>
               <Button asChild size='sm' variant='default' className='w-full' onMouseEnter={() => prefetchPage(String(data?.id))}>
                  <Link to={Paths.EVENTS_DETAILS.replace(':id', String(data?.id))}>Chi tiết</Link>
               </Button>
            </CardFooter>
         </Card>
      </>
   )
}

export const EventHorizontalCard: React.FC<{ data: EventType }> = ({ data }) => {
   const prefetchPage = usePrefetch('getEventDetails')
   const [open, setOpen] = useState<boolean>(false)
   const user = useAppSelector((state) => state.auth.user)

   return (
      <>
         {data?.status_join === JoinEventStatus.ALREADY && <FeedbackFormModal open={open} onOpenChange={setOpen} sender={user!} eventId={data?.id!} />}
         <Card className='grid h-fit grid-cols-[1fr_2fr] gap-4 md:grid-cols-[1fr_3fr]'>
            <CardHeader className='block space-y-0 p-4'>
               <Image
                  src={data?.banner}
                  className='aspect-square h-[12rem] w-full min-w-[12rem] max-w-[12rem] rounded-lg object-cover object-center'
                  width='100%'
               />
            </CardHeader>
            <CardContent className='space-y-2 py-4'>
               <CardTitle className='capitalize'>
                  <Link to={Paths.EVENTS_DETAILS.replace(':id', String(data?.id))}>{data?.name}</Link>
               </CardTitle>
               <CardDescription className='flex items-center space-x-2'>
                  <Icon name='Clock' />
                  <time>
                     {format(data?.start_time, 'dd/MM/yyyy')} - {format(data?.end_time, 'dd/MM/yyyy')}
                  </time>
               </CardDescription>
               <CardDescription className='line-clamp-2 leading-tight sm:line-clamp-1'>{data?.description}</CardDescription>
               <Badge variant={data?.status === EventStatus.ACTIVE ? 'success' : 'destructive'} className='w-fit'>
                  {EventStatusValues.get(data.status)}
               </Badge>
               <CardFooter className='items-end justify-end gap-x-1 px-0 pb-0 pt-10'>
                  <Button variant='outline' className='gap-x-2' size='sm' disabled={data?.status === EventStatus.INACTIVE} onClick={() => setOpen(true)}>
                     <Icon name='Reply' /> Feedback
                  </Button>
                  <Button asChild variant='default' className='gap-x-2' size='sm' onMouseEnter={() => prefetchPage(String(data?.id))}>
                     <Link to={Paths.EVENTS_DETAILS.replace(':id', String(data.id))}>
                        <Icon name='MousePointerClick' /> Chi tiết
                     </Link>
                  </Button>
               </CardFooter>
            </CardContent>
         </Card>
      </>
   )
}

import { EventStatusValues } from '@/common/constants/constants'
import { EventStatus } from '@/common/constants/enums'
import useQueryParams from '@/common/hooks/use-query-params'
import { EventInterface, NotificationInterface, UserInterface } from '@/common/types/entities'
import { cn } from '@/common/utils/cn'
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
   Icon,
   Typography
} from '@/components/ui'
import { format, formatDistanceToNow } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useContext } from 'react'
import { NotificationContext } from '../context/notification-context'

const NotificationCard: React.FC<{ data: NotificationInterface }> = ({ data }) => {
   const { selectedNotification, setSelectedNotification } = useContext(NotificationContext)

   return (
      <Card
         className={cn('space-y-2 p-4 duration-200 ease-in-out hover:bg-accent/50', { 'bg-accent': selectedNotification?.id === data.id })}
         onClick={() => setSelectedNotification(data)}
      >
         <CardHeader className='p-0'>
            <Box className='flex flex-row items-center justify-between'>
               <SenderInfoHoverCard data={data?.create_by!} />
               <Typography variant='small' color={selectedNotification?.id === data.id ? 'default' : 'muted'} className='text-xs'>
                  {formatDistanceToNow(new Date(data?.created_at), { locale: vi, addSuffix: true })}
               </Typography>
            </Box>
            <Box className='flex items-center gap-x-1 text-xs font-medium'>
               To: <EventInfoHoverCard data={{ ...data?.event!, attendances_count: data?.user_join.length }} />
            </Box>
         </CardHeader>
         <CardContent className='space-y-2 p-0'>
            <Typography variant='small' className='line-clamp-1 text-xs font-semibold'>
               {data.title}
            </Typography>
            <Typography variant='small' color='muted' className='line-clamp-2 text-xs' dangerouslySetInnerHTML={{ __html: data.content }} />
         </CardContent>
      </Card>
      // <Link to={{ search: qs.stringify({ ...params, id: data.id }) }} onMouseEnter={() => prefetch({ id: String(data.id), params: { type: 'deleted' } })}>
      // </Link>
   )
}

const SenderInfoHoverCard: React.FC<{ data: Partial<UserInterface> }> = ({ data }) => (
   <HoverCard>
      <HoverCardTrigger asChild>
         <Button variant='link' className='h-fit gap-x-2 p-0 capitalize text-foreground'>
            {data?.name}
         </Button>
      </HoverCardTrigger>
      <HoverCardContent align='start' className='w-fit'>
         <Box className='flex justify-between space-x-4'>
            <Avatar>
               <AvatarImage src={data?.avatar} />
               <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Box>
               <Typography className='whitespace-nowrap text-sm font-semibold capitalize'>{data?.name}</Typography>
               <Typography variant='small' className='text-xs'>
                  {data?.email}
               </Typography>
               <Box className='flex items-center pt-2'>
                  <Icon name='Calendar' className='mr-2 opacity-70' />
                  <Typography variant='small' color='muted' className='text-xs'>
                     Tham gia ngày {format(data?.created_at ?? new Date(), 'dd/MM/yyyy')}
                  </Typography>
               </Box>
            </Box>
         </Box>
      </HoverCardContent>
   </HoverCard>
)

const EventInfoHoverCard: React.FC<{ data: Partial<EventInterface> }> = ({ data }) => (
   <HoverCard openDelay={2} closeDelay={2}>
      <HoverCardTrigger asChild>
         <Button variant='link' className='h-fit w-fit gap-x-2 p-0 text-xs text-foreground'>
            {data?.name}
         </Button>
      </HoverCardTrigger>
      <HoverCardContent align='start' className='max-w-[12rem] space-y-2'>
         <Typography className='whitespace-nowrap text-sm font-semibold'>{data?.name}</Typography>
         <Typography variant='small' className='text-xs' color='muted'>
            {Intl.NumberFormat().format(data?.attendances_count!)} thành viên
         </Typography>
         <Box className='flex items-center gap-x-2 text-xs'>
            <Box
               className={cn('h-2 w-2 rounded-full bg-success ring-2 ring-border', {
                  'bg-success': data?.status === EventStatus.ACTIVE,
                  'bg-yellow-500': data.status === EventStatus.UPCOMING,
                  'bg-destructive': data.status === EventStatus.INACTIVE
               })}
            />
            {EventStatusValues.get(data?.status ?? 2)}
         </Box>
      </HoverCardContent>
   </HoverCard>
)

export default NotificationCard

import { Paths } from '@/common/constants/pathnames'
import { Badge, Box, Button, Icon } from '@/components/ui'
import { useGetEventDetailsQuery, useParticipateInEventMutation } from '@/redux/apis/event.api'
import { useNavigate, useParams } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import Breadcrumbs from './components/breadcrumbs'
import RelatedEvents from './components/related-events'
import Loading from './loading'
import { useAppSelector } from '@/redux/hook'
import { toast } from 'sonner'
import { useGetAttendeeInfoQuery } from '@/redux/apis/attendance.api'
import { format } from 'date-fns'

const EventDetails: React.FunctionComponent = () => {
   const { id } = useParams()
   const { data: eventDetails, isLoading } = useGetEventDetailsQuery(id!)
   const { user, authenticated } = useAppSelector((state) => state.auth)
   const [participateInEvent, { isSuccess }] = useParticipateInEventMutation()
   const { data: attendeeInfo } = useGetAttendeeInfoQuery(id!, { skip: !authenticated })
   const navigate = useNavigate()

   const handleJoinInEvent = () => {
      if (!authenticated) {
         navigate(Paths.SIGNIN)
         return
      }

      toast.promise(participateInEvent({ event_id: +id!, user_id: user?.id! }), {
         loading: 'Đang đăng ký tham gia sự kiện',
         success: 'Đã đăng ký tham gia thành công',
         error: 'Đăng ký tham gia sự kiện thất bại'
      })
   }

   if (isLoading) return <Loading />

   return (
      <Box className='mx-auto flex w-full max-w-7xl flex-col gap-y-10 py-10 sm:px-4 md:px-4'>
         <Box className='flex items-center justify-between'>
            <Breadcrumbs name={eventDetails?.name!} currentPath={Paths.HOME + '/' + eventDetails?.id} />
            {/* <PrivateComponent roles={[UserRoleEnum.STUDENT]}> */}
            {Boolean(attendeeInfo) ? (
               <Badge variant='success' className='gap-x-2'>
                  <Icon name='CheckCircle' /> Đã đăng ký
               </Badge>
            ) : (
               <Button size='sm' className='gap-x-2' onClick={handleJoinInEvent} disabled={isSuccess}>
                  <Icon name='PlusCircle' />
                  {isSuccess ? 'Đã đăng ký' : 'Đăng ký tham gia'}
               </Button>
            )}
            {/* </PrivateComponent> */}
         </Box>

         <Box className='space-y-1'>
            <Time>
               Thời gian diễn ra: {format(new Date(eventDetails?.start_time!), 'dd/MM/yyyy') as string} -{' '}
               {format(new Date(eventDetails?.end_time!), 'dd/MM/yyyy') as string}
            </Time>
            <Box className='flex items-center gap-x-2'>
               <Icon name='User' />
               {eventDetails?.user?.name}
            </Box>
         </Box>

         <Box className='flex flex-grow items-stretch justify-between gap-10 sm:flex-col md:flex-col'>
            <Box
               as='article'
               className='sm: prose w-full max-w-3xl basis-3/4 text-foreground sm:mx-auto sm:max-w-full md:mx-auto md:max-w-full'
               dangerouslySetInnerHTML={{ __html: eventDetails?.content! }}
            />
            <RelatedEvents />
         </Box>
      </Box>
   )
}

const Time = tw.time`italic`

export default EventDetails

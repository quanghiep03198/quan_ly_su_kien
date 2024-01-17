/* eslint-disable */

import { EventStatus, JoinEventStatus } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import { UserInterface } from '@/common/types/entities'
import { Badge, Box, Button, Icon } from '@/components/ui'
import { useGetEventDetailsQuery, useParticipateInEventMutation } from '@/redux/apis/event.api'
import { useAppSelector } from '@/redux/hook'
import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import FeedbackFormModal from '../../components/shared/feedback-form-modal'
import Breadcrumbs from './components/breadcrumbs'

const EventDetailsPage: React.FunctionComponent = () => {
   const { id } = useParams()
   const { data: eventDetails } = useGetEventDetailsQuery(id!)
   const { user, authenticated } = useAppSelector((state) => state.auth)
   const [participateInEvent] = useParticipateInEventMutation()
   // const { data: attendeeInfo } = useGetAttendeeInfoQuery(id!, { skip: !authenticated })
   const [openFeedbackFormState, setOpenFeedbackFormState] = useState<boolean>(false)

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

   return (
      <>
         <Box className='mx-auto flex w-full max-w-7xl flex-col gap-y-10 py-10 sm:px-4 md:px-4'>
            {/* Top-bar */}
            <Box className='flex items-center justify-between sm:flex-col sm:items-start sm:gap-y-4'>
               <Breadcrumbs name={eventDetails?.name!} currentPath={Paths.HOME + '/' + eventDetails?.id} />
               <Box className='flex items-center gap-x-2'>
                  {eventDetails?.status_join === JoinEventStatus.ALREADY && (
                     <Button
                        variant='outline'
                        className='gap-x-2'
                        disabled={eventDetails.status === EventStatus.INACTIVE}
                        onClick={() => setOpenFeedbackFormState(true)}
                     >
                        <Icon name='Reply' /> Feedback
                     </Button>
                  )}
                  {eventDetails?.status_join === JoinEventStatus.ALREADY ? (
                     <Badge variant='success' className='h-9 gap-x-2'>
                        <Icon name='CheckCircle' /> Đã đăng ký
                     </Badge>
                  ) : (
                     <Button
                        size='sm'
                        className='gap-x-2'
                        variant={'default'}
                        onClick={handleJoinInEvent}
                        disabled={eventDetails?.status === EventStatus.INACTIVE}
                     >
                        <Icon name='PlusCircle' />
                        Đăng ký tham gia
                     </Button>
                  )}
               </Box>
            </Box>

            {/* Infomation */}
            <Box className='space-y-1'>
               <Time>
                  Thời gian diễn ra: {format(eventDetails?.start_time ?? new Date(), 'dd/MM/yyyy') as string} -{' '}
                  {format(eventDetails?.end_time ?? new Date(), 'dd/MM/yyyy') as string}
               </Time>
               <Box className='flex items-center gap-x-2'>
                  <Icon name='User' />
                  {eventDetails?.user?.name}
               </Box>
            </Box>

            {/* Body */}
            <Box className='flex flex-grow items-stretch justify-between gap-10 sm:flex-col md:flex-col'>
               <Box
                  as='article'
                  className='sm: prose w-full max-w-3xl basis-3/4 text-foreground sm:mx-auto sm:max-w-full md:mx-auto md:max-w-full'
                  dangerouslySetInnerHTML={{ __html: eventDetails?.content! }}
               />
            </Box>
         </Box>
         <FeedbackFormModal open={openFeedbackFormState} onOpenChange={setOpenFeedbackFormState} eventId={id!} sender={user as Partial<UserInterface>} />
      </>
   )
}

const Time = tw.time`italic`

export default EventDetailsPage

import { Badge, Box, Icon, Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/components/ui'
import { useGetEventDetailsQuery } from '@/redux/apis/event.api'
import { format } from 'date-fns'
import { useCallback, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import ParticipantsList from './components/attendees-list'
import FeedbackList from './components/feedback-list'

const EventDetailsPage: React.FunctionComponent = () => {
   const { id } = useParams()
   const { data } = useGetEventDetailsQuery(id!)
   const [params, setParams] = useSearchParams()

   useEffect(() => {
      if (!params.get('tab'))
         setParams((params) => {
            params.set('tab', 'preview')
            return params
         })
   }, [])

   const handleTabChange = useCallback((value: string) => {
      setParams((params) => {
         params.set('tab', value)
         return params
      })
   }, [])

   return (
      <Tabs defaultValue={params.get('tab') ?? 'participants'} onValueChange={handleTabChange}>
         <Box className='flex items-start justify-between gap-10 border-b pb-4 sm:flex-col md:flex-col'>
            <Box className='space-y-2'>
               <Typography variant='h6' className='capitalize'>
                  {data?.name}
               </Typography>
               <Time>
                  <Icon name='Clock' className='text-foreground' />
                  {format(data?.start_time ?? new Date(), 'dd/MM/yyyy')} - {format(data?.end_time! ?? new Date(), 'dd/MM/yyyy')}
               </Time>
            </Box>
            <Box className='max-w-full sm:rounded-lg sm:bg-accent sm:px-2'>
               <Box className='max-w-full overflow-x-auto scrollbar-none'>
                  <TabsList className='flex w-fit items-center sm:justify-start'>
                     <TabsTrigger value='participants' className='min-w-fit gap-x-6'>
                        <Box className='flex w-full flex-1 items-center gap-x-2'>
                           <Icon name='Users' />
                           Thành viên
                        </Box>
                        <Badge variant='secondary' className='aspect-square h-5 w-5 justify-center text-xs'>
                           {data?.attendances?.length ?? 0}
                        </Badge>
                     </TabsTrigger>
                     <TabsTrigger value='feedback' className='min-w-fit gap-x-4'>
                        <Box className='flex w-full flex-1 items-center gap-x-2'>
                           <Icon name='MessagesSquare' />
                           Feedback
                        </Box>
                        <Badge variant='secondary' className='aspect-square h-5 w-5 justify-center text-xs'>
                           {data?.feedback?.length ?? 0}
                        </Badge>
                     </TabsTrigger>
                  </TabsList>
               </Box>
            </Box>
         </Box>

         <TabsContent value='participants' className='mt-6 border-none outline-none ring-0'>
            <ParticipantsList />
         </TabsContent>
         <TabsContent value='feedback' className='mt-6 border-none outline-none ring-0'>
            <FeedbackList />
         </TabsContent>
      </Tabs>
   )
}

const Time = tw.time`text-sm text-muted-foreground inline-flex items-center gap-x-2`

export default EventDetailsPage

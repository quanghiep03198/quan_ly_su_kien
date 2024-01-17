import { FeedbackInterface } from '@/common/types/entities'
import { Box, Icon, ScrollArea } from '@/components/ui'
import { useGetAllFeedbackByEventQuery } from '@/redux/apis/feedback.api'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Feedback from './feedback-card'
import FeedbackDetails from './feedback-details'
import SimplePagination from '../../../../components/shared/simple-pagination'

const FeedbackList: React.FunctionComponent = () => {
   const { id } = useParams()
   const { data } = useGetAllFeedbackByEventQuery({ eventId: id!, params: { pagination: true } })

   const [currentFeedback, setCurrentFeedback] = useState<FeedbackInterface>()

   useEffect(() => {
      setCurrentFeedback(data?.docs?.[0])
   }, [data])

   return (
      <Box className='grid grid-cols-[1.5fr_1fr] items-stretch divide-x divide-border rounded-lg border sm:grid-cols-1 md:grid-cols-1'>
         <Box className='flex flex-col items-stretch divide-y divide-border'>
            <Box className='m-0 basis-[4rem] p-3'>
               <SimplePagination hasNextPage={false} hasPrevPage={false} totalDocs={0} totalPages={1} />
            </Box>
            <Box className='p-3'>
               <ScrollArea className='h-[calc(90vh-4.75rem)]'>
                  {Array.isArray(data) && data.length > 0 ? (
                     <Box className='flex flex-col gap-y-4'>
                        {data.map((item: FeedbackInterface) => (
                           <Box onClick={() => setCurrentFeedback(item)}>
                              <Feedback key={item.id} data={item} />
                           </Box>
                        ))}
                     </Box>
                  ) : (
                     <EmptySection />
                  )}
               </ScrollArea>
            </Box>
         </Box>

         <FeedbackDetails data={currentFeedback!} />
      </Box>
   )
}

const EmptySection: React.FunctionComponent = () => {
   return (
      <Box className='flex h-[calc(90vh-4.75rem)] w-full items-center justify-center gap-x-4 text-muted-foreground'>
         <Icon name='MailX' size={32} strokeWidth={1} /> Chưa có phản hồi nào
      </Box>
   )
}

export default FeedbackList

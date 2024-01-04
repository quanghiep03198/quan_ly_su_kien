import { FeedbackType } from '@/common/types/entities'
import { Box, Button, Icon, ScrollArea } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import Feedback from './feedback-card'
import FeedbackDetails from './feedback-details'
import FeedbackListPagination from './pagination'
import SearchBox from './search-box'

const FeedbacksList: React.FC<{ data: Array<FeedbackType> }> = ({ data }) => {
   const [currentFeedback, setCurrentFeedback] = useState<FeedbackType>()

   useEffect(() => {
      setCurrentFeedback(data[0])
   }, [data])

   return (
      <Box className='grid grid-cols-[1.5fr_1fr] items-stretch divide-x divide-border rounded-lg border sm:grid-cols-1 md:grid-cols-1'>
         <Box className=' flex flex-col items-stretch divide-y divide-border'>
            <Box className='m-0 flex basis-[4rem] items-stretch justify-between p-3'>
               <Box className='flex items-center gap-x-2'>
                  <SearchBox />
                  <Button size='icon' variant='outline'>
                     <Icon name='RefreshCcw' />
                  </Button>
               </Box>
               <FeedbackListPagination hasNextPage={false} hasPrevPage={false} totalDocs={0} totalPages={1} />
            </Box>
            <Box className='p-3'>
               <ScrollArea className='h-[calc(90vh-4.75rem)]'>
                  {Array.isArray(data) && data.length > 0 ? (
                     <Box className='flex flex-col gap-y-4'>
                        {data.map((item: FeedbackType) => (
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

export default FeedbacksList

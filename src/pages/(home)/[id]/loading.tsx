import { Box, Skeleton } from '@/components/ui'
import React from 'react'

const presetLines = Array.apply(null, Array(50)).map((_, j) => j)

const Loading: React.FunctionComponent = () => {
   return (
      <Box className='mx-auto flex h-[75vh] max-w-5xl flex-col gap-10'>
         <Box className='flex items-center justify-between'>
            <Skeleton className='h-2 w-20' />
            <Skeleton className='h-8 w-16' />
         </Box>
         <Box className='item-stretch flex flex-col gap-y-1'>
            <Skeleton className='mb-6 h-6 w-full' />
            {presetLines.map((_, index) => (
               <Skeleton key={index} className='h-2' />
            ))}
         </Box>
      </Box>
   )
}

export default Loading

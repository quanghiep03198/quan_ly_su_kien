import { Box, Card, CardContent, CardFooter, CardHeader, Skeleton } from '@/components/ui'

const PlaceHolderCard: React.FunctionComponent = () => {
   return (
      <Card className='max-w-72 w-full overflow-clip'>
         {
            <CardHeader className='p-0'>
               <Skeleton className='h-52' />
            </CardHeader>
         }
         <CardContent className='flex flex-col gap-y-2 px-3 py-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-3 w-1/2' />
            <Box className='my-2 flex flex-col space-y-2'>
               <Skeleton className='h-2 w-full' />
               <Skeleton className='h-2 w-full' />
               <Skeleton className='h-2 w-full' />
            </Box>
            <Skeleton className='h-3 w-1/2' />
         </CardContent>
         <CardFooter className='mt-2 justify-center px-3'>
            <Skeleton className='h-10 w-full' />
         </CardFooter>
      </Card>
   )
}

export default PlaceHolderCard

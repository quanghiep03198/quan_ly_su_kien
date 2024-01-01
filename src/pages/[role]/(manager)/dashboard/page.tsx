import { Box, Typography } from '@/components/ui'
import { Overview } from './components/overview'
import { RecentEvents } from './components/recent-events'
import { DateRangePicker } from '@/components/ui/@shadcn/date-range-picker'
import Statistics from './components/statistics'

const Dashboard: React.FunctionComponent = () => {
   return (
      <Box className='space-y-6'>
         <Box className='flex items-center justify-between'>
            <Typography variant='heading6'>Dashboard</Typography>
            <DateRangePicker align='end' />
         </Box>
         <Statistics />
         <Box className='grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[1.75fr_1fr]'>
            <Overview />
            <RecentEvents />
         </Box>
      </Box>
   )
}

export default Dashboard

import { Box, Card, CardContent, CardDescription, CardHeader, CardTitle, Icon, Typography } from '@/components/ui'
import { IconProps } from '@/components/ui/@shadcn/icon'
import { useGetEventsQuery } from '@/redux/apis/event.api'
import React from 'react'

type StatisticData = {
   title: string
   icon: IconProps['name']
   statisticValue: number
   growPercentage: number
}

const Statistics: React.FunctionComponent = () => {
   const { data: events } = useGetEventsQuery()
   const data: Array<StatisticData> = [
      {
         title: 'Sự kiện đã tổ chức',
         icon: 'CalendarCheck',
         statisticValue: events?.metadata?.length ?? 0,
         growPercentage: 0.25
      },
      {
         title: 'Số lượng sinh viên đăng ký',
         icon: 'UsersRound',
         statisticValue: Math.floor(Math.random() * 1000) + 5000,
         growPercentage: 0.7
      },
      {
         title: 'Số lượng công tác viên',
         icon: 'UserRoundPlus',
         statisticValue: Math.floor(Math.random() * 1000) + 500,
         growPercentage: 0.2
      },
      {
         title: 'Feedbacks',
         icon: 'MessageSquare',
         statisticValue: Math.floor(Math.random() * 1000) + 10000,
         growPercentage: 0.65
      }
   ]
   return (
      <Box className='grid grid-cols-4 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
         {data.map((stats, index) => (
            <Card key={index}>
               <CardHeader>
                  <CardTitle className='flex items-center justify-between'>
                     {stats.title} <Icon name={stats.icon} />
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <Typography variant='heading6'>{new Intl.NumberFormat().format(stats.statisticValue)}</Typography>
                  <CardDescription>{stats.growPercentage * 100}% so với tháng trước</CardDescription>
               </CardContent>
            </Card>
         ))}
      </Box>
   )
}

export default Statistics

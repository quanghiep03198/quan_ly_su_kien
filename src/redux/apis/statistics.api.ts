import { StatisticsType } from '@/common/types/entities'
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'

const reducerPath = 'statistic/api' as const
const tagTypes = ['Event', 'Feedback', 'User'] as const

export const statisticApi = createApi({
   reducerPath,
   tagTypes,
   keepUnusedDataFor: 5 * 60,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getStatistics: build.query<StatisticsType, void>({
         query: () => ({ url: '/statistics', method: 'GET' }),
         transformResponse: (response: HttpResponse<StatisticsType>) => {
            const data = response.metadata
            return {
               ...data!,
               percentInEvent: data?.percentInEvent?.toFixed(2),
               percentInFeedBack: data?.percentInFeedBack?.toFixed(2),
               percentInJoinEvent: data?.percentInJoinEvent?.toFixed(2)
            } as unknown as StatisticsType
         },
         providesTags: tagTypes
      })
   })
})

export const { useGetStatisticsQuery } = statisticApi

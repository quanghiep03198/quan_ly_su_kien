import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'
import { StatisticsType } from '@/common/types/entities'

const reducerPath = 'statistic/api' as const
const tagTypes = ['Events', 'Feedbacks', 'Users'] as const

export const statisticApi = createApi({
   reducerPath,
   tagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getStatistics: build.query<StatisticsType, void>({
         query: () => ({ url: '/statistics', method: 'GET' }),
         providesTags: tagTypes
      })
   })
})

export const { useGetStatisticsQuery } = statisticApi

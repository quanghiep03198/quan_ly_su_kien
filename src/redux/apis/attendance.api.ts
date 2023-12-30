import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'

const tagTypes = ['Event', 'EventStatistics'] as const
const reducerPath: string = 'event_api' as const

export const attendanceApi = createApi({
   reducerPath,
   tagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => {
      return {
         getAttendanceByEvent: build.query({
            query: ({ eventId, userId }) => ({ url: `/attendances/join/${eventId}/${userId}`, method: 'GET' }),
            providesTags: tagTypes
         }),
         addAttendance: build.mutation({
            query: (payload) => ({ url: '/attendances/add', method: 'POST', data: payload }),
            invalidatesTags: (_, error) => (error ? [] : tagTypes)
         }),
         getAttendanceInfo: build.query({
            query: (id) => ({ url: `/attendances/${id}`, method: 'GET' }),
            providesTags: tagTypes
         })
      }
   }
})

export const { useAddAttendanceMutation, useGetAttendanceInfoQuery, useGetAttendanceByEventQuery } = attendanceApi

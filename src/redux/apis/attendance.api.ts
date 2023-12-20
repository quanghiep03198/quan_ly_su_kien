import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'

const TagTypes = ['Event', 'EventStatistics'] as const

const attendanceApi = createApi({
   reducerPath: 'event_api',
   tagTypes: TagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => {
      return {
         getAttendanceByEvent: build.query({
            query: ({ eventId, userId }) => ({ url: `/attendances/join/${eventId}/${userId}`, method: 'GET' }),
            providesTags: TagTypes
         }),
         addAttendance: build.mutation({
            query: (payload) => ({ url: '/attendances/add', method: 'POST', data: payload }),
            invalidatesTags: TagTypes
         }),
         getAttendanceInfo: build.mutation({
            query: (id) => ({ url: `/attendances/${id}` + id, method: 'GET' }),
            invalidatesTags: TagTypes
         })
      }
   }
})

const { useAddAttendanceMutation, useGetAttendanceInfoMutation, useGetAttendanceByEventQuery } = attendanceApi

export { attendanceApi as default, useAddAttendanceMutation, useGetAttendanceInfoMutation, useGetAttendanceByEventQuery }

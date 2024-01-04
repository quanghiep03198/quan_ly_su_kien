import { UserType } from '@/common/types/entities'
import { createApi } from '@reduxjs/toolkit/query/react'
import { AxiosRequestConfig } from 'axios'
import axiosBaseQuery from '../helper'
import { eventApi } from './event.api'

const tagTypes = ['Attendance', 'Event'] as const
const reducerPath: string = 'attendance/api' as const

export const attendanceApi = createApi({
   reducerPath,
   tagTypes,
   keepUnusedDataFor: 5 * 60,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => {
      return {
         getAttendeesByEvent: build.query<Pagination<UserType>, { id: string; params: AxiosRequestConfig['params'] }>({
            query: ({ id, params }) => ({ url: `/attendances/join/${id}`, method: 'GET', params }),
            transformResponse: (response: HttpResponse<Pagination<{ user: UserType } & Record<string, any>>>) => {
               return { ...response.metadata, docs: response.metadata?.docs?.map((doc) => doc.user) } as Pagination<UserType>
            },
            providesTags: (result, _error, _arg) => {
               return result ? [...result.docs?.map(({ id }) => ({ type: 'Attendance' as const, id }))] : tagTypes
            }
         }),
         addAttendance: build.mutation<unknown, { email: string; event_id: string | number }>({
            query: (payload) => ({ url: '/attendances/add', method: 'POST', data: payload }),
            onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
               await queryFulfilled
               dispatch(eventApi.endpoints.getEventDetails.initiate(args.event_id as string))
            },
            invalidatesTags: (_, error, args) => (error ? [] : [{ type: 'Event', id: args.event_id }, ...tagTypes])
         }),
         getAttendeeInfo: build.query({
            query: (id) => ({ url: `/attendances/${id}`, method: 'GET' }),
            providesTags: tagTypes
         }),
         updateAttendeeInfo: build.mutation<unknown, { id: string | number; payload: Pick<UserType, 'email' | 'name' | 'phone' | 'role'> }>({
            query: ({ id, payload }) => ({ url: `/attendances/${id}`, method: 'PUT', data: payload }),
            invalidatesTags: tagTypes
         }),
         removeAttendanceFromEvent: build.mutation<unknown, number>({
            query: (id) => ({ url: `/attendances/${id}`, method: 'DELETE' }),
            invalidatesTags: tagTypes
         })
      }
   }
})

export const {
   useAddAttendanceMutation,
   useGetAttendeeInfoQuery,
   useGetAttendeesByEventQuery,
   useRemoveAttendanceFromEventMutation,
   useUpdateAttendeeInfoMutation
} = attendanceApi

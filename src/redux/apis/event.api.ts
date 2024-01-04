import { EventStatusValues } from '@/common/constants/constants'
import { EventType } from '@/common/types/entities'
import { createApi } from '@reduxjs/toolkit/query/react'
import { format } from 'date-fns'
import axiosBaseQuery from '../helper'

type RequestParams = {
   search?: string
   page?: number
   limit?: number
   pagination?: boolean
   sort?: string
}

const reducerPath = 'event/api' as const
const tagTypes = ['Event'] as const

export const eventApi = createApi({
   reducerPath,
   tagTypes,
   keepUnusedDataFor: 5 * 60,
   refetchOnReconnect: true,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => {
      return {
         getEvents: build.query<OptionalPagination<EventType>, RequestParams>({
            query: (params) => ({ url: '/event', method: 'GET', params }),
            transformResponse: (response: HttpResponse<OptionalPagination<EventType>>, _meta, args) => {
               // With pagination
               if (typeof args.pagination === 'undefined') return response.metadata as Pagination<EventType>
               return (response.metadata as Array<EventType>)?.map((item) => {
                  return {
                     ...item,
                     status: EventStatusValues.get(item.status)
                  }
               })
            },
            providesTags: [{ type: 'Event', id: 'PARTIAL_LIST' }]
         }),
         getUpcomingEvents: build.query<EventType, void>({
            query: () => ({ url: '/event/notification', method: 'GET', params: { pagination: false } }),
            providesTags: [{ type: 'Event' as const, id: 'UPCOMING_LIST' }]
         }),
         getRecentEvents: build.query<EventType[], void>({
            query: () => ({ url: '/getNearstEvent', method: 'GET' }),
            transformResponse: (response: HttpResponse<EventType[]>) => {
               if (!Array.isArray(response.metadata)) {
                  return [] as EventType[]
               }
               return response.metadata?.map((item) => ({
                  ...item,
                  start_time: format(item.start_time, 'dd/MM/yyyy'),
                  end_time: format(item.end_time, 'dd/MM/yyyy'),
                  status: EventStatusValues.get(item.status)
               }))
            },
            providesTags: [{ type: 'Event', id: 'RECENT_LIST' }]
         }),
         participateInEvent: build.mutation<unknown, { user_id: number; event_id: number }>({
            query: (payload) => ({ url: '/attendances', method: 'POST', data: payload }),
            invalidatesTags: tagTypes
         }),
         getEventDetails: build.query<EventType, string>({
            query: (id) => ({ url: `/event/${id}`, method: 'GET' }),
            transformResponse: (response: HttpResponse<EventType>) => {
               return response.metadata!
            },
            providesTags: (result, _error, _arg) => (result ? [{ type: 'Event' as const, id: result?.id }] : tagTypes)
         }),
         createEvent: build.mutation({
            query: (payload) => ({ url: '/event', method: 'POST', data: payload }),
            invalidatesTags: (_result, error, _arg) => (!!error ? [] : tagTypes)
         }),
         updateEvent: build.mutation({
            query: ({ id, payload }) => ({ url: '/event/' + id, method: 'PUT', data: payload }),
            invalidatesTags: (_result, error, _arg) => (!!error ? [] : tagTypes)
         }),
         getEventStatistics: build.query({
            query: () => ({ url: '/eventStatistics', method: 'GET' }),
            providesTags: tagTypes
         }),
         deleteEvent: build.mutation({
            query: (id) => ({ url: '/event/' + id, method: 'DELETE' }),
            invalidatesTags: (_result, error) => (!!error ? [] : tagTypes)
         })
      }
   }
})

export const {
   usePrefetch,
   useGetEventsQuery,
   useGetUpcomingEventsQuery,
   useCreateEventMutation,
   useGetEventStatisticsQuery,
   useUpdateEventMutation,
   useGetEventDetailsQuery,
   useDeleteEventMutation,
   useGetRecentEventsQuery,
   useParticipateInEventMutation
} = eventApi

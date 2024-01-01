import { EventStatusValues } from '@/common/constants/constants'
import { EventType } from '@/common/types/entities'
import { createApi } from '@reduxjs/toolkit/query/react'
import { format } from 'date-fns'
import axiosBaseQuery from '../helper'
import { PaginationStateType } from '@/common/hooks/use-server-pagination'

const reducerPath = 'event/api' as const
const tagTypes = ['Event'] as const

export const eventApi = createApi({
   reducerPath,
   tagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => {
      return {
         getEvents: build.query<Pagination<EventType>, PaginationStateType & { search?: string }>({
            query: ({ page, limit, search }) => {
               page ??= 1
               limit ??= 20
               return { url: '/event', method: 'GET', params: { page, limit, search } }
            },
            providesTags: tagTypes,
            transformResponse: (response: HttpResponse<Pagination<EventType>>) => {
               return {
                  ...response.metadata,
                  docs: response.metadata?.docs?.map((item) => ({
                     ...item,
                     start_time: format(item.start_time, 'dd/MM/yyyy'),
                     end_time: format(item.start_time, 'dd/MM/yyyy'),
                     status: EventStatusValues.get(item.status)
                  }))
               } as Pagination<EventType>
            }
         }),
         getRecentEvents: build.query<EventType[], void>({
            query: () => ({ url: '/getNearstEvent', method: 'GET' }),
            providesTags: tagTypes
         }),
         participateInEvent: build.mutation<unknown, { user_id: number; event_id: number }>({
            query: (payload) => ({ url: '/attendances', method: 'POST', data: payload }),
            invalidatesTags: tagTypes
         }),
         getEventDetails: build.query<EventType, string>({
            query: (id) => ({ url: `/event/${id}`, method: 'GET' }),
            transformResponse: (response: HttpResponse<EventType>) => {
               return response.metadata as EventType
            },
            providesTags: (result, _error, _arg) => (result ? [{ type: 'Event' as const, id: result?.id }] : tagTypes)
         }),
         createEvent: build.mutation({
            query: (payload) => ({ url: '/event', method: 'POST', data: payload }),
            invalidatesTags: (_result, error) => (!!error ? [] : tagTypes)
         }),
         updateEvent: build.mutation({
            query: ({ id, payload }) => ({ url: '/event/' + id, method: 'PUT', data: payload }),
            invalidatesTags: (_result, error) => (!!error ? [] : tagTypes)
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
   useGetEventsQuery,
   useCreateEventMutation,
   useGetEventStatisticsQuery,
   useUpdateEventMutation,
   useGetEventDetailsQuery,
   useDeleteEventMutation,
   useGetRecentEventsQuery,
   useParticipateInEventMutation
} = eventApi

//  { useCreateEventMutation, useDeleteEventMutation, useGetEventStatisticsQuery, useGetEventsQuery, useUpdateEventMutation }

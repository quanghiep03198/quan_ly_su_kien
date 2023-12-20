import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'

const TagTypes = ['Event', 'EventStatistics'] as const

const eventApi = createApi({
   reducerPath: 'event_api',
   tagTypes: TagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => {
      return {
         getEvents: build.query({
            query: () => ({ url: '/event', method: 'GET' }),
            providesTags: TagTypes
         }),
         createEvent: build.mutation({
            query: (payload) => ({ url: '/event', method: 'POST', data: payload }),
            invalidatesTags: TagTypes
         }),
         updateEvent: build.mutation({
            query: ({ id, payload }) => ({ url: '/event/' + id, method: 'PUT', data: payload }),
            invalidatesTags: TagTypes
         }),
         getEventStatistics: build.query({
            query: () => ({ url: '/eventStatistics', method: 'GET' }),
            providesTags: TagTypes
         }),
         deleteEvent: build.mutation({
            query: (id) => ({ url: '/event/' + id, method: 'DELETE' }),
            invalidatesTags: TagTypes
         })
      }
   }
})

const { useGetEventsQuery, useCreateEventMutation, useGetEventStatisticsQuery, useUpdateEventMutation, useDeleteEventMutation } = eventApi

export { eventApi as default, useGetEventsQuery, useCreateEventMutation, useGetEventStatisticsQuery, useUpdateEventMutation, useDeleteEventMutation }

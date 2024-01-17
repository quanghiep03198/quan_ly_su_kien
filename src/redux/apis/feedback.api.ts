import { createApi } from '@reduxjs/toolkit/dist/query/react'
import axiosBaseQuery from '../helper'
import { FeedbackInterface } from '@/common/types/entities'
import { AxiosRequestConfig } from 'axios'

const reducerPath = 'feedbacks/api' as const
const tagTypes = ['Feedback'] as const

export const feedbackApi = createApi({
   reducerPath,
   tagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getAllFeedbackByEvent: build.query<Pagination<FeedbackInterface>, { eventId: string; params?: AxiosRequestConfig['params'] }>({
         query: ({ eventId, params }) => ({ url: `/feedback/${eventId}`, method: 'GET', params }),
         providesTags: tagTypes
      }),
      getFeedbackDetails: build.query<FeedbackInterface, string>({
         query: (id) => ({ url: `/feedback/show/${id}`, method: 'GET' }),
         providesTags: (result, _error, _arg) => (result ? [{ type: 'Feedback' as const, id: result?.id }, ...tagTypes] : tagTypes)
      }),
      createFeedback: build.mutation<unknown, { event_id: string; content?: string }>({
         query: (payload) => ({ url: '/feedback', method: 'POST', data: payload }),
         invalidatesTags: (_result, error, _args) => (error ? [] : tagTypes)
      }),
      updateFeedback: build.mutation<unknown, { id: number; payload: Partial<FeedbackInterface> }>({
         query: ({ id, payload }) => ({ url: `/feedback/${id}`, method: 'PATCH', data: payload }),
         invalidatesTags: (_result, error, _args) => (error ? [] : tagTypes)
      }),
      deleteFeedback: build.mutation<unknown, number>({
         query: (id) => ({ url: `/feedback/${id}`, method: 'DELETE' }),
         invalidatesTags: (_result, error, _args) => (error ? [] : tagTypes)
      })
   })
})

export const { useGetAllFeedbackByEventQuery, useGetFeedbackDetailsQuery, useCreateFeedbackMutation, useUpdateFeedbackMutation, useDeleteFeedbackMutation } =
   feedbackApi

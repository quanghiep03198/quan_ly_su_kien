import { createApi } from '@reduxjs/toolkit/dist/query/react'
import axiosBaseQuery from '../helper'
import { FeedbackType } from '@/common/types/entities'
import { AxiosRequestConfig } from 'axios'

const reducerPath = 'feedbacks/api' as const
const tagTypes = ['Feedback'] as const

export const feedbackApi = createApi({
   reducerPath,
   tagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getAllFeedbackByEvent: build.query<Pagination<FeedbackType>, { eventId: string; params: AxiosRequestConfig['params'] }>({
         query: ({ eventId, params }) => ({ url: `/feedbacks/${eventId}`, method: 'GET', params }),
         providesTags: tagTypes
      }),
      getFeedbackDetails: build.query<FeedbackType, string>({
         query: (id) => ({ url: `/feedback/show/${id}`, method: 'GET' }),
         providesTags: (result, _error, _arg) => (result ? [{ type: 'Feedback' as const, id: result?.id }, ...tagTypes] : tagTypes)
      }),
      createFeedback: build.mutation<unknown, { event_id: string | number; content: string }>({
         query: (payload) => ({ url: '/feedback', method: 'POST', data: payload }),
         invalidatesTags: (_result, error, _args) => (Boolean(error) ? [] : tagTypes)
      })
   })
})

export const { useGetAllFeedbackByEventQuery, useGetFeedbackDetailsQuery, useCreateFeedbackMutation } = feedbackApi

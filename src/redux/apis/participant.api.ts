import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'
import { UserType } from '@/common/types/entities'
import { PaginationStateType } from '@/common/hooks/use-server-pagination'
import generatePicture from '@/common/utils/generate-picture'

type Participant = Omit<UserType, 'password'>
type CreateParticipantPayload = Omit<UserType, 'id' | 'password'>
type UpdateParticipantPayload = {
   id: Required<number>
   payload: Partial<UserType>
}

const reducerPath = 'participant/api' as const
const tagTypes = ['Participant'] as const

export const participantApi = createApi({
   reducerPath,
   tagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getParticipants: build.query<Pagination<Participant>, PaginationStateType>({
         query: ({ page, limit }) => ({ url: '/participants', method: 'GET', params: { page, limit, pagination: false } }),
         providesTags: tagTypes,
         transformResponse: (response: HttpResponse<Pagination<Participant>>) => {
            const docs = Array.isArray(response.metadata?.docs) ? response.metadata?.docs.map((item) => ({ ...item, picture: generatePicture(item.name) })) : []
            return {
               ...response.metadata,
               docs
            } as Pagination<Participant>
         }
      }),
      addParticipant: build.mutation<HttpResponse<Participant>, CreateParticipantPayload>({
         query: (payload) => ({ url: '/participants', method: 'POST', data: payload }),
         invalidatesTags: (_, error) => (error ? [] : tagTypes)
      }),
      updatePariticipant: build.mutation<HttpResponse<Participant>, UpdateParticipantPayload>({
         query: ({ id, payload }) => ({ url: `/participants/${id}`, method: 'PUT', data: payload }),
         invalidatesTags: (_, error) => (error ? [] : tagTypes)
      }),
      deleteParticipant: build.mutation<HttpResponse<undefined>, number>({
         query: (id) => ({ url: `/participant/${id}`, method: 'DELETE' }),
         invalidatesTags: (_, error) => (error ? [] : tagTypes)
      })
   })
})

export const { useGetParticipantsQuery, useAddParticipantMutation, useUpdatePariticipantMutation, useDeleteParticipantMutation } = participantApi

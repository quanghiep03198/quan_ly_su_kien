import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'
import { UserType } from '@/common/types/entities'
import { PaginationStateType } from '@/common/hooks/use-server-pagination'
import { DefaultPaginationData } from '@/common/constants/constants'
import _ from 'lodash'

type Participant = Omit<UserType, 'password'>
type CreateParticipantPayload = Omit<UserType, 'id' | 'password'>
type UpdateParticipantPayload = {
   id: Required<number>
   payload: Partial<UserType>
}
type ParticipantsListWithPagination = Exclude<OptionalPagination<Participant>, Array<Participant>>
// type ParticipantsListWithoutPagination = Exclude<OptionalPagination<Participant>, Pagination<Participant>>

const reducerPath = 'participant/api' as const
const tagTypes = ['Participant'] as const

export const participantApi = createApi({
   reducerPath,
   tagTypes,
   keepUnusedDataFor: 5 * 60,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getParticipants: build.query<OptionalPagination<Participant>, Partial<PaginationStateType> & { pagination?: boolean }>({
         query: ({ page, limit, pagination = false }) => ({ url: '/participants', method: 'GET', params: { page, limit, pagination } }),
         providesTags: tagTypes,
         transformResponse: (response: HttpResponse<OptionalPagination<Participant>>, _meta, args) => {
            const data = response?.metadata
            if (args.pagination && _.has(data, ['docs'])) {
               const _data = data as ParticipantsListWithPagination
               return {
                  ..._data,
                  docs: _data?.docs
               } as Pagination<Participant>
            }
            return data as Array<Participant>
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

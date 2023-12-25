import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'
import { UserType } from '@/common/types/entities'

const reducerPath = 'participant/api' as const
const tagTypes = ['Participant'] as const

export const participantApi = createApi({
   reducerPath,
   tagTypes,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getParticipants: build.query<HttpResponse<Partial<UserType>[]>, void>({
         query: () => ({ url: '/participants', method: 'GET' }),
         providesTags: tagTypes
      })
   })
})

export const { useGetParticipantsQuery } = participantApi

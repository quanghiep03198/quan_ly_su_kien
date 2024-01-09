import { UserType } from '@/common/types/entities'
import { createApi } from '@reduxjs/toolkit/query/react'
import _ from 'lodash'
import axiosBaseQuery from '../helper'
import { UserRoleEnum } from '@/common/constants/enums'
import { AxiosRequestConfig } from 'axios'

type UserListWithPagination = Exclude<OptionalPagination<UserType>, Array<UserType>>
type RequestParams = Partial<PaginationPayload> & { role?: UserRoleEnum; pagination?: boolean } & AxiosRequestConfig['params']

const reducerPath = 'UserType/api' as const
const tagTypes = ['UserType'] as const

export const userApi = createApi({
   reducerPath,
   tagTypes,
   keepUnusedDataFor: 5 * 60,
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => ({
      getUsers: build.query<OptionalPagination<UserType>, RequestParams>({
         query: (params) => ({ url: '/participants', method: 'GET', params }),
         providesTags: tagTypes,
         transformResponse: (response: HttpResponse<OptionalPagination<UserType>>, _meta, args) => {
            // With pagination
            if (typeof args.pagination === 'undefined') {
               const data = response?.metadata as UserListWithPagination
               return {
                  ...data,
                  docs: data?.docs
               } as Pagination<UserType>
            }
            // Without pagination
            return response?.metadata as Array<UserType>
         }
      }),
      addUser: build.mutation<HttpResponse<UserType>, Partial<UserType>>({
         query: (payload) => ({ url: '/participants', method: 'POST', data: payload }),
         invalidatesTags: (_result, error, _args) => (error ? [] : tagTypes)
      }),
      updateUser: build.mutation<
         HttpResponse<UserType>,
         {
            id: Required<number>
            payload: Partial<UserType>
         }
      >({
         query: ({ id, payload }) => ({ url: `/participants/${id}`, method: 'PUT', data: payload }),
         invalidatesTags: (_result, error, _args) => (error ? [] : tagTypes)
      }),
      deleteUser: build.mutation<HttpResponse<undefined>, number>({
         query: (id) => ({ url: `/participants/${id}`, method: 'DELETE' }),
         invalidatesTags: (_result, error, _args) => (error ? [] : tagTypes)
      })
   })
})

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi

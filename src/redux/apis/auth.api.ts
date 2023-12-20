import { User } from '@/common/types/entities'
import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../helper'

type SigninMetadata = Omit<User, 'password'> & { token: string }
type SigninPayload = Pick<User, 'email' | 'password'>
type SignupPayload = Omit<User, 'id'>
type SignupMetadata = Omit<User, 'password'>

const authApi = createApi({
   reducerPath: 'auth_api',
   tagTypes: ['Auth'],
   baseQuery: axiosBaseQuery(),
   endpoints: (build) => {
      return {
         signin: build.mutation<HttpResponse<SigninMetadata>, SigninPayload>({
            query: (payload) => ({ url: '/login', method: 'POST', data: payload }),
            onQueryStarted: async (_, { queryFulfilled }) => {
               const { data } = await queryFulfilled
               const accessToken = data?.metadata?.token
               localStorage.setItem('access_token', `Bearer ${accessToken}`)
            }
         }),
         signup: build.mutation<HttpResponse<SignupMetadata>, SignupPayload>({
            query: (payload) => ({ url: '/register', method: 'POST', data: payload })
         })
      }
   }
})

const { useSigninMutation, useSignupMutation } = authApi

export { authApi as default, useSigninMutation, useSignupMutation }

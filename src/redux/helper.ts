import axiosInstance from '@/configs/axios.config'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'

declare type AxiosBaseQueryConfig = {
   url: AxiosRequestConfig['url']
   method: AxiosRequestConfig['method']
   data?: AxiosRequestConfig['data']
   params?: AxiosRequestConfig['params']
   headers?: AxiosRequestConfig['headers']
}
const axiosBaseQuery =
   (): BaseQueryFn<AxiosBaseQueryConfig, unknown, unknown> =>
   async ({ url, method, data, params, headers }) => {
      try {
         const response = await axiosInstance.request({
            url: url,
            method,
            data,
            params,
            headers
         })
         return { data: response }
      } catch (axiosError) {
         const err = axiosError as AxiosError
         return {
            error: {
               status: err.response?.status,
               data: err.response?.data || err.message
            }
         }
      }
   }

export default axiosBaseQuery

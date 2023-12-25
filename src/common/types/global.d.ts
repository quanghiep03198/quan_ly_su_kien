import HttpStatus from '@/common/constants/http-status'
import { Icon } from '@/components/ui'
import { icons } from 'lucide-react'

declare global {
   declare type HttpResponse<T> = {
      status: 'success' | 'error'
      message: string
      statusCode: HttpStatus
      metadata?: T
   }

   declare type ErrorResponse = {
      data: HttpResponse<undefined>
      status: HttpStatus
   }

   declare type MenuNavigationItem = {
      icon?: keyof typeof icons
      name: string
      path: string
   }

   declare type AnonymousFunction = (...args: any[]) => any

   declare type Pagination<T> = {
      docs: Array<T>
      hasNextPage: boolean
      hasPrevPage: boolean
      limit: number
      page: number
      pagingCounter: number
      totalDocs: number
      totalPage: number
   }
   interface Document {
      documentMode?: unknown
   }

   interface Window {
      MSStream?: unknown
   }
}

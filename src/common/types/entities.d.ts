import { UserRoleEnum } from '../constants/enums'

export type User = {
   id: number
   name: string
   password?: string
   email: string
   picture?: string
   phone: string
   role: UserRoleEnum
}

export type Event = {
   attendances_count: number
   banner: string
   contact: string
   created_at: Date
   end_time: Date
   id: number
   location: string
   name: string
   start_time: Date
   status: any
   updated_at: Date
   user_id: number
}

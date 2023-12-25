import { UserRoleEnum } from '../constants/enums'

export type UserType = {
   id: number
   name: string
   password?: string
   email: string
   picture?: string
   phone: string
   role: UserRoleEnum
}

export type EventType = {
   attendances_count: number
   banner: string
   contact: string
   end_time: Date | string
   id: number
   location: string
   name: string
   start_time: Date | string
   status: any
   created_at: Date | string
   updated_at: Date | string
   user_id: number
}

import { JoinEventStatus, UserRoleEnum } from '../constants/enums'

export type UserType = {
   id: number
   name: string
   password?: string
   email: string
   avatar?: string
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
   description: string
   content: string
   status: any
   status_join: JoinEventStatus
   created_at: Date | string
   updated_at: Date | string
   user_id: number
   user?: Partial<UserType>
   feedback?: FeedbackType[]
   attendances: Partial<UserType>[]
}

export type StatisticsType = {
   eventInLastMonth: number
   eventInCurrentMonth: number
   percentInEvent: number
   joinEventInCurrentMonth: number
   joinEventInLastMonth: number
   percentInJoinEvent: number
   userInRoleStaff: number
   feedBackInCurrentMonth: number
   feedBackInLastMonth: number
   percentInFeedBack: number
}

export type FeedbackType = {
   id: number
   content: string
   user_id: number
   event_id: number
   created_at: Date
   updated_at: Date
   user: Partial<UserType>
   created_at: Date
   updated_at: Date
   read?: boolean
}

export interface FeedbackInterface {
   id: number
   event_id: number
   rating: 1 | 2 | 3 | 4 | 5 // overall point of the quality of event organization
   comment: string
   recommendation: string // what user recommend to enhance the quality of event organization
   suggest_for_friend: 'yes' | 'no' //enum
   has_read: boolean // check if user has read the feedback or not
   sender: Partial<UserType> // user who send this feedback
   created_at: Date
   updated_at: Date
   // user_id: number
}

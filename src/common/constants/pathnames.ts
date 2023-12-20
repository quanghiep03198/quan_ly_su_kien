export const COMMON_PATHS = {
   DEFAULT: '/'
} as const

export const AUTH_PATHS = {
   SIGNIN: '/signin',
   SIGNUP: '/signup',
   RECOVER_PASSOWRD: '/quen-mat-khau'
}

export const ERROR_PATHS = { NOT_FOUND: '/404', PERMISSION_DENIED: '/403' } as const

export const MANAGER_PATHS = {
   EVENTS_MANAGEMENT: '/quan-ly-su-kien',
   STAFFS_MANAGEMENT: '/quan-ly-nhan-vien',
   ATENDEES: '/sinh-vien-gia-su-kien',
   STATISTICS: '/thong-ke-su-kien',
   PARTICIPANTS: '/cong-tac-vien'
} as const

export const STAFF_PATHS = {} as const

export const STUDENT_PATHS = {} as const

import { Paths } from '@/common/constants/pathnames'

export const metadata = {
   [Paths.DEFAULT]: 'Trang chủ',

   /* AUTH */
   [Paths.SIGNIN]: 'Đăng nhập',
   [Paths.SIGNUP]: 'Đăng ký tài khoản',

   /* ERROR */
   [Paths.NOT_FOUND]: '404 - Page not found',
   [Paths.PERMISSION_DENIED]: '403 - Access denied',

   /* MANAGER */
   [Paths.MANAGER + '/' + Paths.MANAGER_DASHBOARD]: 'Màn hình chính',
   [Paths.MANAGER + '/' + Paths.EVENTS_LIST]: 'Sự kiện',
   [Paths.MANAGER + '/' + Paths.EVENTS_CREATE]: 'Thêm sự kiện',
   [Paths.MANAGER + '/' + Paths.PARTICIPANTS_LIST]: 'Cộng tác viên',
   // [Paths.MANAGER + '/' + Paths.PARTICIPANTS_MANAGEMENT]: 'Sinh viên',
   [Paths.MANAGER + '/' + Paths.STATISTICS_MANAGEMENT]: 'Thống kê',
   [Paths.MANAGER + '/' + Paths.ATENDEES_LIST]: '',

   /* NAVIGATION */
   [Paths.REDIRECT]: 'Đang chuyển hướng ...'
} as const

import { Paths } from '@/common/constants/pathnames'

export const metadata = {
   [Paths.HOME]: 'Trang chủ',
   [Paths.HOME + '/:id']: 'Sự kiện',
   /* AUTH */
   [Paths.SIGNIN]: 'Đăng nhập',
   [Paths.SIGNUP]: 'Đăng ký tài khoản',

   /* ERROR */
   [Paths.NOT_FOUND]: '404 - Page not found',
   [Paths.PERMISSION_DENIED]: '403 - Access denied',

   /* MANAGER */
   [Paths.MANAGER_DASHBOARD]: 'Màn hình chính',
   [Paths.EVENTS_LIST]: 'Sự kiện',
   [Paths.EVENTS_CREATE]: 'Thêm sự kiện',
   [Paths.EVENTS_UPDATE]: 'Cập nhật sự kiện',
   [Paths.PARTICIPANTS_LIST]: 'Cộng tác viên',
   [Paths.STUDENTS_LIST]: '',

   /* NAVIGATION */
   [Paths.REDIRECT]: 'Đang chuyển hướng ...'
} as const

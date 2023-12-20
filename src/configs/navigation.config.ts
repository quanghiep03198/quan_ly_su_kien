import { MANAGER_PATHS } from '@/common/constants/pathnames'

export const ManagerNavigation: Array<MenuNavigationItem> = [
   {
      icon: 'CalendarCheck2',
      name: 'Danh sách sự kiện',
      path: MANAGER_PATHS.EVENTS_MANAGEMENT
   },

   {
      icon: 'Users',
      name: 'Danh sách nhân viên',
      path: MANAGER_PATHS.STAFFS_MANAGEMENT
   },
   {
      icon: 'Users',
      name: 'Sinh viên tham gia sự kiện',
      path: MANAGER_PATHS.ATENDEES
   },
   {
      icon: 'BarChart4',
      name: 'Thống kê',
      path: MANAGER_PATHS.STATISTICS
   },
   {
      icon: 'BellRing',
      name: 'Cài đặt thông báo',
      path: MANAGER_PATHS.EVENTS_MANAGEMENT
   }
]

import { Paths } from '@/common/constants/pathnames'

export const ManagerNavigation: Array<MenuNavigationItem> = [
   {
      icon: 'LayoutDashboard',
      name: 'Màn hình chính',
      path: Paths.MANAGER_DASHBOARD
   },
   {
      icon: 'CalendarCheck2',
      name: 'Sự kiện',
      path: Paths.EVENTS_LIST
   },

   {
      icon: 'Users',
      name: 'Nhân viên',
      path: Paths.STAFFS_MANAGEMENT
   },
   {
      icon: 'UsersRound',
      name: 'Sinh viên',
      path: Paths.ATENDEES_MANAGEMENTS
   },
   {
      icon: 'BarChart4',
      name: 'Thống kê',
      path: Paths.STATISTICS_MANAGEMENT
   },
   {
      icon: 'BellRing',
      name: 'Cài đặt thông báo',
      path: Paths.NOTIFICATION_SETTINGS
   }
]

import { Paths } from '@/common/constants/pathnames'

export const ManagerNavigation: Array<MenuNavigationItem> = [
   {
      id: '1',
      icon: 'LayoutDashboard',
      name: 'Màn hình chính',
      path: Paths.MANAGER_DASHBOARD
   },
   {
      id: '2',
      icon: 'CalendarCheck2',
      name: 'Sự kiện',
      path: Paths.EVENTS_LIST
   },

   {
      id: '3',
      icon: 'Users',
      name: 'Cộng tác viên',
      path: Paths.PARTICIPANTS_LIST
   },
   { id: '4', icon: 'UsersRound', name: 'Sinh viên', path: Paths.STUDENTS_LIST },

   {
      id: '5',
      icon: 'BellRing',
      name: 'Cài đặt thông báo',
      path: Paths.NOTIFICATION_SETTINGS
   }
]

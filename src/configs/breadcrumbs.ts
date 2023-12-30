import { Paths } from '@/common/constants/pathnames'

export const breadcrumbs = {
   /* MANAGER */
   [Paths.MANAGER + '/' + Paths.MANAGER_DASHBOARD]: [{ path: Paths.MANAGER + '/' + Paths.MANAGER_DASHBOARD, name: 'Màn hình chính' }],
   [Paths.MANAGER + '/' + Paths.EVENTS_LIST]: [{ path: Paths.MANAGER + '/' + Paths.EVENTS_LIST, name: 'Sự kiện' }],
   [Paths.MANAGER + '/' + Paths.EVENTS_CREATE]: [
      { path: Paths.MANAGER + '/' + Paths.EVENTS_LIST, name: 'Sự kiện' },
      { path: Paths.MANAGER + '/' + Paths.EVENTS_CREATE, name: 'Thêm mới' }
   ],
   [Paths.MANAGER + '/' + Paths.PARTICIPANTS_LIST]: [{ path: Paths.MANAGER + '/' + Paths.PARTICIPANTS_LIST, name: 'Công tác viên' }],
   [Paths.MANAGER + '/' + Paths.ATENDEES_LIST]: [{ path: Paths.MANAGER + '/' + Paths.ATENDEES_LIST, name: 'Sinh viên' }],
   [Paths.MANAGER + '/' + Paths.STATISTICS_MANAGEMENT]: [{ path: Paths.MANAGER + '/' + Paths.STATISTICS_MANAGEMENT, name: 'Thống kê' }]
}

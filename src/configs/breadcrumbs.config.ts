import { Paths } from '@/common/constants/pathnames'

export const breadcrumbs = {
   /* MANAGER */
   [Paths.MANAGER_DASHBOARD]: [{ path: Paths.MANAGER_DASHBOARD, name: 'Màn hình chính' }],
   [Paths.EVENTS_LIST]: [{ path: Paths.EVENTS_LIST, name: 'Sự kiện' }],
   [Paths.EVENTS_CREATE]: [
      { path: Paths.EVENTS_LIST, name: 'Sự kiện' },
      { path: Paths.EVENTS_CREATE, name: 'Thêm mới' }
   ],
   [Paths.EVENTS_UPDATE]: [
      { path: Paths.EVENTS_LIST, name: 'Sự kiện' },
      { path: Paths.EVENTS_UPDATE, name: 'Cập nhật' }
   ],
   [Paths.PARTICIPANTS_LIST]: [{ path: Paths.PARTICIPANTS_LIST, name: 'Công tác viên' }],
   [Paths.STUDENTS_LIST]: [{ path: Paths.STUDENTS_LIST, name: 'Sinh viên' }]
}

import { UserRoleEnum } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import AuthGuard from '@/guard/auth.guard'
import RoleGuard from '@/guard/role.guard'
import { lazy } from 'react'
import SidebarLayout from '@/pages/[role]/(manager)/layout'
import { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/[role]/(manager)/dashboard/page'))
const EventList = lazy(() => import('@/pages/[role]/(manager)/events/page'))
const CreateEvent = lazy(() => import('@/pages/[role]/(manager)/events/create/page'))
const UpdateEvent = lazy(() => import('@/pages/[role]/(manager)/events/[id]-update/page'))
const StaffList = lazy(() => import('@/pages/[role]/(manager)/staffs/page'))
const StudentsList = lazy(() => import('@/pages/[role]/(manager)/students/page'))
const NotificationSettings = lazy(() => import('@/pages/[role]/(manager)/notification-settings/page'))
const EventDetails = lazy(() => import('@/pages/[role]/(manager)/events/[id]/page'))

const managerRoutes: RouteObject = {
   path: Paths.MANAGER,
   element: (
      <AuthGuard>
         <SidebarLayout />
      </AuthGuard>
   ),
   children: [
      {
         path: Paths.MANAGER_DASHBOARD,
         element: (
            <RoleGuard roles={[UserRoleEnum.MANAGER]}>
               <Dashboard />
            </RoleGuard>
         )
      },
      {
         path: Paths.EVENTS_LIST,
         element: (
            <RoleGuard roles={[UserRoleEnum.MANAGER, UserRoleEnum.STAFF]}>
               <EventList />
            </RoleGuard>
         )
      },

      {
         path: Paths.EVENTS_CREATE,
         element: (
            <RoleGuard roles={[UserRoleEnum.MANAGER, UserRoleEnum.STAFF]}>
               <CreateEvent />
            </RoleGuard>
         )
      },
      {
         path: Paths.EVENT_STATISTICS_DETAILS,
         element: (
            <RoleGuard roles={[UserRoleEnum.MANAGER, UserRoleEnum.STAFF]}>
               <EventDetails />
            </RoleGuard>
         )
      },
      {
         path: Paths.EVENTS_UPDATE,
         element: (
            <RoleGuard roles={[UserRoleEnum.MANAGER, UserRoleEnum.STAFF]}>
               <UpdateEvent />
            </RoleGuard>
         )
      },
      {
         path: Paths.STAFFS_LIST,
         element: (
            <RoleGuard roles={[UserRoleEnum.MANAGER]}>
               <StaffList />
            </RoleGuard>
         )
      },
      {
         path: Paths.STUDENTS_LIST,
         element: (
            <RoleGuard roles={[UserRoleEnum.MANAGER]}>
               <StudentsList />
            </RoleGuard>
         )
      },
      { path: Paths.NOTIFICATION_SETTINGS, element: <NotificationSettings /> }
   ]
}

export default managerRoutes

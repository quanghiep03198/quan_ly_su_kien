import { Paths } from '@/common/constants/pathnames'
import AuthGuard from '@/guard/auth.guard'
import AppLayout from '@/pages/[role]/layout'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/[role]/(manager)/dashboard'))
const EventList = lazy(() => import('@/pages/[role]/(manager)/events'))
const CreateEvent = lazy(() => import('@/pages/[role]/(manager)/events/create'))
const StaffList = lazy(() => import('@/pages/[role]/(manager)/participants'))
const NotificationSettings = lazy(() => import('@/pages/[role]/(manager)/notification-settings'))

const managerRoutes: RouteObject = {
   path: Paths.MANAGER,
   element: (
      <AuthGuard>
         <AppLayout />
      </AuthGuard>
   ),
   children: [
      { path: Paths.MANAGER_DASHBOARD, element: <Dashboard /> },
      { path: Paths.EVENTS_LIST, element: <EventList /> },
      { path: Paths.EVENTS_CREATE, element: <CreateEvent /> },
      { path: Paths.PARTICIPANTS_LIST, element: <StaffList /> },
      { path: Paths.STATISTICS_MANAGEMENT, element: <></> },
      { path: Paths.NOTIFICATION_SETTINGS, element: <NotificationSettings /> }
   ]
}

export default managerRoutes

import { Paths } from '@/common/constants/pathnames'
import AuthGuard from '@/guard/auth.guard'
import AppLayout from '@/pages/[role]/layout'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('@/pages/[role]/(manager)/dashboard'))
const EventList = lazy(() => import('@/pages/[role]/(manager)/events'))
const CreateEvent = lazy(() => import('@/pages/[role]/(manager)/events/create'))

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
      { path: Paths.STAFFS_MANAGEMENT, element: <></> },
      { path: Paths.STATISTICS_MANAGEMENT, element: <></> },
      { path: Paths.PARTICIPANTS_MANAGEMENT, element: <></> }
   ]
}

export default managerRoutes

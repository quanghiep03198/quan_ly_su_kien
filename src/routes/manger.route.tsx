import { MANAGER_PATHS } from '@/common/constants/pathnames'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'
const EventList = lazy(() => import('@/pages/(manager)/manage-events'))

const managerRoutes: Array<RouteObject> = [{ path: MANAGER_PATHS.EVENTS_MANAGEMENT, element: <EventList /> }]

export default managerRoutes

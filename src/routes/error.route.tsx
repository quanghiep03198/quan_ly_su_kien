import { Paths } from '@/common/constants/pathnames'
import NotFound from '@/pages/(error)/not-found'
import PermissionDenied from '@/pages/(error)/permision-denied'
import { RouteObject } from 'react-router-dom'

const errorRoutes: Array<RouteObject> = [
   {
      path: Paths.NOT_FOUND,
      element: <NotFound />
   },
   {
      path: Paths.PERMISSION_DENIED,
      element: <PermissionDenied />
   }
]

export default errorRoutes

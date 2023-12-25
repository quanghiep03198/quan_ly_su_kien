import { Paths } from '@/common/constants/pathnames'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Signin = lazy(() => import('@/pages/(auth)/signin'))
const Signup = lazy(() => import('@/pages/(auth)/signup'))

const authRoutes: Array<RouteObject> = [
   {
      path: Paths.SIGNIN,
      element: <Signin />
   },
   {
      path: Paths.SIGNUP,
      element: <Signup />
   }
]

export default authRoutes

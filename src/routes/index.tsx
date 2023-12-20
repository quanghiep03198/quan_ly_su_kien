import { AUTH_PATHS, COMMON_PATHS, ERROR_PATHS } from '@/common/constants/pathnames'
import AuthGuard from '@/guard/auth-guard'
import NotFound from '@/pages/(error)/not-found'
import PermissionDenied from '@/pages/(error)/permision-denied'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import LoadingProgressBar from '@/components/customs/loading-progress-bar'
import managerRoutes from './manger.route'
const RootLayout = lazy(() => import('@/layouts'))
const Navigation = lazy(() => import('./navigation'))
const Signin = lazy(() => import('@/pages/(auth)/signin'))
const Signup = lazy(() => import('@/pages/(auth)/signup'))

const Router: React.FunctionComponent = () => {
   const router = createBrowserRouter([
      {
         path: COMMON_PATHS.DEFAULT,
         element: (
            <AuthGuard>
               <Suspense fallback={<LoadingProgressBar />}>
                  <RootLayout />
               </Suspense>
            </AuthGuard>
         ),
         children: [{ index: true, element: <Navigation /> }, ...managerRoutes]
      },
      {
         path: '*',
         element: <Navigate to={ERROR_PATHS.NOT_FOUND} />
      },
      {
         path: ERROR_PATHS.NOT_FOUND,
         element: <NotFound />
      },
      {
         path: ERROR_PATHS.PERMISSION_DENIED,
         element: <PermissionDenied />
      },
      {
         path: AUTH_PATHS.SIGNIN,
         element: (
            <Suspense fallback={<LoadingProgressBar />}>
               <Signin />
            </Suspense>
         )
      },
      {
         path: AUTH_PATHS.SIGNUP,
         element: (
            <Suspense fallback={<LoadingProgressBar />}>
               <Signup />
            </Suspense>
         )
      }
   ])

   return <RouterProvider router={router} />
}

export default Router

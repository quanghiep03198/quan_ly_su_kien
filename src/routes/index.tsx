import { Paths } from '@/common/constants/pathnames'
import RootLayout from '@/pages/layout'
import { lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import authRoutes from './auth.route'
import errorRoutes from './error.route'
import managerRoutes from './manger.route'
import Home from '@/pages/(home)/page'
import AuthGuard from '@/guard/auth.guard'
import SidebarLayout from '@/pages/[role]/layout'
import StackLayout from '@/pages/(home)/layout'

const EventDetails = lazy(() => import('@/pages/(home)/[id]/page'))

const Navigation = lazy(() => import('../pages/navigation'))

const Router: React.FunctionComponent = () => {
   const router = createBrowserRouter([
      {
         path: Paths.HOME,
         element: <RootLayout />,
         children: [
            {
               path: Paths.HOME,
               element: <StackLayout />,
               children: [
                  {
                     path: Paths.HOME,
                     element: <Home />
                  },
                  {
                     path: Paths.EVENT_DETAILS,
                     element: <EventDetails />
                  }
               ]
            },

            {
               path: '/redirect',
               element: <Navigation />
            },

            {
               path: Paths.MANAGER,
               element: (
                  <AuthGuard>
                     <SidebarLayout />
                  </AuthGuard>
               ),
               children: [...managerRoutes]
            },
            ...errorRoutes,
            ...authRoutes
         ]
      },
      {
         path: '*',
         element: <Navigate to={Paths.NOT_FOUND} />
      }
   ])

   return <RouterProvider router={router} />
}

export default Router

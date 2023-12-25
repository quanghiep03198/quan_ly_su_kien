import { Paths } from '@/common/constants/pathnames'
import RootLayout from '@/pages/layout'
import { lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import authRoutes from './auth.route'
import errorRoutes from './error.route'
import managerRoutes from './manger.route'
import Home from '@/pages/(home)'

const Navigation = lazy(() => import('../pages/navigation'))

const Router: React.FunctionComponent = () => {
   const router = createBrowserRouter([
      {
         path: Paths.DEFAULT,
         element: <RootLayout />,
         children: [
            {
               path: Paths.DEFAULT,
               element: <Home />
            },
            {
               path: '/redirect',
               element: <Navigation />
            },
            managerRoutes,
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

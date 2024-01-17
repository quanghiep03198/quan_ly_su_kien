import { Paths } from '@/common/constants/pathnames'
import RootLayout from '@/pages/layout'
import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import authRoutes from './auth.route'
import errorRoutes from './error.route'
import managerRoutes from './manger.route'
import studentRoutes from './student.route'
import userPreferencesRoutes from './user-preferences.route'

const Navigation = lazy(() => import('../pages/navigation'))

const Router: React.FunctionComponent = () => {
   const router = [
      {
         path: Paths.HOME,
         element: <RootLayout />,
         children: [
            {
               index: true,
               element: <Navigation />
            },
            ...errorRoutes,
            ...authRoutes,
            managerRoutes,
            studentRoutes,
            userPreferencesRoutes
         ]
      },
      {
         path: '*',
         element: <Navigate to={Paths.NOT_FOUND} />
      }
   ]

   return useRoutes(router)
}

export default Router

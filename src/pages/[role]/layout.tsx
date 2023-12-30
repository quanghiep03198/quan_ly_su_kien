import { UserRoleEnum } from '@/common/constants/enums'
import ErrorBoundary from '@/components/exceptions/error-boundary'
import LoadingProgressBar from '@/components/shared/loading-progress-bar'
import { Box } from '@/components/ui'
import { ManagerNavigation } from '@/configs/navigation.config'
import { useAppSelector } from '@/redux/hook'
import { Suspense, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavHeader from './components/nav-header'
import DrawerNavSidebar from './components/nav-sidebar/drawer-nav-sidebar'
import StaticNavSidebar from './components/nav-sidebar/static-nav-sidebar'

const AppLayout: React.FunctionComponent = () => {
   const [open, setOpen] = useState<boolean>(false)
   const user = useAppSelector((state) => state.auth.user)

   const navigation = useMemo(() => {
      switch (user?.role) {
         case UserRoleEnum.MANAGER:
            return ManagerNavigation
         case UserRoleEnum.STAFF:
            return []
         case UserRoleEnum.STUDENT:
            return ManagerNavigation
         default:
            return ManagerNavigation
      }
   }, [])

   return (
      <>
         <StaticNavSidebar navigation={navigation} />
         <Box className=' w-full pl-80 sm:pl-0 md:pl-0'>
            <NavHeader openState={open} onOpenStateChange={setOpen} />
            <Box as='section' className='p-10  sm:p-3'>
               <ErrorBoundary>
                  <Suspense fallback={<LoadingProgressBar />}>
                     <Outlet />
                  </Suspense>
               </ErrorBoundary>
            </Box>
         </Box>
         <DrawerNavSidebar open={open} onOpenStateChange={setOpen} navigation={navigation} />
      </>
   )
}

export default AppLayout

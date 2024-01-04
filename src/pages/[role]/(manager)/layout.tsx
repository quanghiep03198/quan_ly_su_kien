import { BreakPoints, UserRoleEnum } from '@/common/constants/enums'
import useMediaQuery from '@/common/hooks/use-media-query'
import { cn } from '@/common/utils/cn'
import ErrorBoundary from '@/components/exceptions/error-boundary'
import LoadingProgressBar from '@/components/shared/loading-progress-bar'
import { Box, ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui'
import { ManagerNavigation } from '@/configs/navigation.config'
import { useAppSelector } from '@/redux/hook'
import { Suspense, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavHeader from './components/nav-header'
import DrawerNavSidebar from './components/nav-sidebar/drawer-nav-sidebar'
import StaticNavSidebar from './components/nav-sidebar/static-nav-sidebar'

const Layout: React.FunctionComponent = () => {
   const [open, setOpen] = useState<boolean>(false)
   const [isCollapsed, setIsCollapsed] = useState(false)
   const user = useAppSelector((state) => state.auth.user)
   const isLargeScreen = useMediaQuery(BreakPoints.LARGE)
   const isExtraLargeScreen = useMediaQuery(BreakPoints.EXTRA_LARGE)

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
         <ResizablePanelGroup direction='horizontal' className='h-screen w-screen'>
            <ResizablePanel
               defaultSize={30}
               minSize={4}
               collapsedSize={4}
               maxSize={20}
               collapsible={true}
               className={cn('sm:hidden md:hidden', isCollapsed && 'z-50 min-w-[4rem] transition-all duration-300 ease-in-out')}
               onExpand={() => setIsCollapsed(false)}
               onCollapse={() => setIsCollapsed(true)}
            >
               <StaticNavSidebar navigation={navigation} isCollapsed={isCollapsed} />
            </ResizablePanel>
            <ResizableHandle withHandle={isLargeScreen || isExtraLargeScreen} />
            <ResizablePanel>
               <Box className='h-screen max-w-full overflow-auto bg-background'>
                  <NavHeader openState={open} onOpenStateChange={setOpen} />
                  <Box as='section' className='p-10 sm:p-3'>
                     <ErrorBoundary>
                        <Suspense fallback={<LoadingProgressBar />}>
                           <Outlet />
                        </Suspense>
                     </ErrorBoundary>
                  </Box>
               </Box>
            </ResizablePanel>
         </ResizablePanelGroup>
         <DrawerNavSidebar open={open} onOpenStateChange={setOpen} navigation={navigation} />
      </>
   )
}

export default Layout

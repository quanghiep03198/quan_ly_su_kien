import { Box } from '@/components/ui'
import tw from 'tailwind-styled-components'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import { Outlet } from 'react-router-dom'
import { Suspense, useMemo } from 'react'
import { useAppSelector } from '@/redux/hook'
import { UserRoleEnum } from '@/common/constants/enums'
import { ManagerNavigation } from '@/configs/navigation.config'
import LoadingProgressBar from '@/components/customs/loading-progress-bar'

const RootLayout: React.FunctionComponent = () => {
   const user = useAppSelector((state) => state.auth.user)

   const navigation = useMemo(() => {
      switch (user?.role) {
         case UserRoleEnum.MANAGER:
            return ManagerNavigation
         case UserRoleEnum.STAFF:
            return []
         case UserRoleEnum.STUDENT:
            return []
         default:
            return ManagerNavigation
      }
   }, [])

   return (
      <Container>
         <Sidebar navigation={navigation} />
         <Box className='flex flex-col items-stretch'>
            <Navbar />
            <Box as='section' className='p-10 sm:p-3'>
               <Suspense fallback={<LoadingProgressBar />}>
                  <Outlet />
               </Suspense>
            </Box>
         </Box>
      </Container>
   )
}

const Container = tw(Box)`h-screen w-full grid grid-cols-[1fr_4fr] sm:grid-cols-1 md:grid-cols-1`

export default RootLayout

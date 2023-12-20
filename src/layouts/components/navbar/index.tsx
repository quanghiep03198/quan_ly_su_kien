import { Box, Skeleton } from '@/components/ui'
import { Suspense } from 'react'
import ThemeSelect from '../../../components/shared/theme-select'
import NavbarBreadscrumb from './breadcrumbs'
import DrawerSidebar from './drawer-sidebar'
import Notification from './notification'
import UserActions from './user-actions'

const Navbar: React.FunctionComponent = () => {
   return (
      <Box className='flex items-center justify-between border-b px-6 py-3 sm:px-3'>
         <Box className='flex items-center space-x-3'>
            <Box className='hidden pr-1 sm:block md:block md:border-r'>
               <DrawerSidebar />
            </Box>
            <Box className='sm:hidden md:hidden'>
               <NavbarBreadscrumb />
            </Box>
         </Box>
         <Box className='flex items-center space-x-3'>
            <ThemeSelect />
            <Notification />
            <UserActions />
         </Box>
      </Box>
   )
}

export default Navbar

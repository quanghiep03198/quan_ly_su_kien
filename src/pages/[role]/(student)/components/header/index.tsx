import { Theme, UserRoleEnum } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import useTheme from '@/common/hooks/use-theme'
import { cn } from '@/common/utils/cn'
import ThemeSelect from '@/components/shared/theme-select'
import { Box, Button, Icon, buttonVariants } from '@/components/ui'
import Tooltip from '@/components/ui/@override/tooltip'
import UserActions from '@/pages/components/user-actions'
import { useAppSelector } from '@/redux/hook'
import { Link, NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const restrictedRoles = Object.values(UserRoleEnum).filter((role) => role !== UserRoleEnum.STUDENT)

const Header: React.FunctionComponent = () => {
   const { theme } = useTheme()
   const { user, authenticated } = useAppSelector((state) => state.auth)

   return (
      <Box as='header' className='sticky top-0 z-50 max-h-24 border-b bg-background/50 backdrop-blur'>
         <Box className='mx-auto flex max-w-7xl items-center justify-between p-3'>
            <Link to={Paths.EVENTS_BOARD}>
               <Image src={theme === Theme.LIGHT ? '/logo.png' : '/logo.webp'} />
            </Link>
            <Box className='flex items-center gap-x-6'>
               <NavLink
                  to={Paths.EVENTS_BOARD}
                  className={({ isActive }) => cn('text-muted-foreground duration-200', { 'text-primary': isActive, 'hover:text-foreground': !isActive })}
               >
                  Trang chủ
               </NavLink>
               <NavLink
                  to={Paths.MY_EVENTS}
                  className={({ isActive }) => cn('text-muted-foreground duration-200', { 'text-primary': isActive, 'hover:text-foreground': !isActive })}
               >
                  Sự kiện của tôi
               </NavLink>
            </Box>
            <Box className='flex items-center justify-end gap-x-3'>
               <ThemeSelect />
               {restrictedRoles.includes(user?.role as (typeof restrictedRoles)[number]) && (
                  <Tooltip content='Đi đến dashboard'>
                     <Link to={Paths.REDIRECT} className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-full')}>
                        <Icon name='Navigation' />
                     </Link>
                  </Tooltip>
               )}
               {authenticated ? (
                  <UserActions />
               ) : (
                  <Box className='divide-x divide-muted-foreground'>
                     <Link to={Paths.SIGNIN} className='px-3 text-sm underline-offset-4 hover:text-primary hover:underline'>
                        Đăng nhập
                     </Link>
                     <Link to={Paths.SIGNUP} className='px-3 text-sm underline-offset-4 hover:text-primary hover:underline'>
                        Đăng ký
                     </Link>
                  </Box>
               )}
            </Box>
         </Box>
      </Box>
   )
}

const Image = tw.img`max-w-[10rem] object-cover object-center sm:max-w-[8rem]`

export default Header

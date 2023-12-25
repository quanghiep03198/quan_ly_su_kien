import { UserRoleEnum } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import {
   Avatar,
   AvatarFallback,
   AvatarImage,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuTrigger,
   Icon
} from '@/components/ui'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { signout } from '@/redux/slices/auth.slice'
import { Link, useNavigate } from 'react-router-dom'

const UserActions: React.FunctionComponent = () => {
   const user = useAppSelector((state) => state.auth?.user)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const handleSignout = () => {
      dispatch(signout())
      localStorage.removeItem('access_token')
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className='flex items-center space-x-2 focus:border-none focus:outline-none'>
            <Avatar>
               <AvatarImage src={user?.picture} className='w-full max-w-[3.5rem]' />
               <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className='pl-1 pr-2 text-sm font-normal'>{user?.name}</span>
            <Icon name='ChevronDown' />
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               Tài khoản của tôi
               <DropdownMenuShortcut>
                  <Icon name='User' />
               </DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleSignout}>
               Đăng xuất
               <DropdownMenuShortcut>
                  <Icon name='LogOut' />
               </DropdownMenuShortcut>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default UserActions

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
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const UserActions: React.FunctionComponent = () => {
   const user = useAppSelector((state) => state.auth?.user)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const handleSignout = () => {
      dispatch(signout())
      localStorage.removeItem('access_token')
      toast.info('Đã đăng xuất thành công')
   }

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className='flex items-center space-x-2 focus:border-none focus:outline-none sm:space-x-1'>
            <Avatar className='sm:hidden'>
               <AvatarImage src={user?.avatar} className='max-w-[3rem]' />
               <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className='line-clamp-1 max-w-[128px] pl-1 pr-2 text-left text-sm font-normal'>{user?.name}</span>
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

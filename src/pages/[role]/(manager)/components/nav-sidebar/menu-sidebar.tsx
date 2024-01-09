import { cn } from '@/common/utils/cn'
import { Icon, buttonVariants } from '@/components/ui'
import { breadcrumbs } from '@/configs/breadcrumbs.config'
import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import tw from 'tailwind-styled-components'

type SidebarMenuProps = { navigation: Array<MenuNavigationItem>; onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>> }

const SidebarMenu: React.FC<SidebarMenuProps> = ({ navigation, onOpenStateChange }) => {
   const { pathname } = useLocation()
   return (
      <Menu className='mt-10'>
         <Menu>
            {navigation.map((item) => {
               const isAlsoActive = !!breadcrumbs[matchPath(item.path, pathname) as unknown as keyof typeof breadcrumbs]
               return (
                  <MenuItem key={item.id} onClick={() => onOpenStateChange(false)}>
                     <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                           cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start gap-x-2 text-base font-normal', {
                              'text-primary hover:text-primary': isActive || isAlsoActive,
                              'hover:text-foreground': !isActive
                           })
                        }
                     >
                        <Icon name={item.icon!} size={18} /> {item.name}
                     </NavLink>
                  </MenuItem>
               )
            })}
         </Menu>
      </Menu>
   )
}

export default SidebarMenu

const Menu = tw.ul`flex flex-col space-y-2`
const MenuItem = tw.li`whitespace-nowrap font-normal`

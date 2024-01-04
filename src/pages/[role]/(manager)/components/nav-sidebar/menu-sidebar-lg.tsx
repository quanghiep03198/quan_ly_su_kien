import { cn } from '@/common/utils/cn'
import { Icon, buttonVariants } from '@/components/ui'
import Tooltip from '@/components/ui/@override/tooltip'
import { breadcrumbs } from '@/configs/breadcrumbs.config'
import React from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const CollapseSidebarMenu: React.FC<{ navigation: Array<MenuNavigationItem>; isCollapsed: boolean }> = ({ navigation, isCollapsed }) => {
   const { pathname } = useLocation()

   return (
      <Menu>
         {navigation.map((item) => {
            const isAlsoActive = !!matchPath(item.path, pathname)
            return isCollapsed ? (
               <MenuItem key={item.id}>
                  <Tooltip content={item.name} side='right'>
                     <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                           cn(buttonVariants({ variant: 'ghost', size: 'icon' }), {
                              'text-primary hover:text-primary': isActive || isAlsoActive,
                              'hover:text-foreground': !isActive
                           })
                        }
                     >
                        <Icon name={item.icon!} size={18} />
                     </NavLink>
                  </Tooltip>
               </MenuItem>
            ) : (
               <MenuItem key={item.id}>
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
   )
}

export default CollapseSidebarMenu

const Menu = tw.ul`flex flex-col space-y-2 mt-10`
const MenuItem = tw.li`whitespace-nowrap font-normal`

import { cn } from '@/common/utils/cn'
import { Icon, buttonVariants } from '@/components/ui'
import { breadcrumbs } from '@/configs/breadcrumbs'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const SidebarMenu: React.FC<{ navigation: Array<MenuNavigationItem> }> = ({ navigation }) => {
   const { pathname } = useLocation()
   console.log('first', breadcrumbs[pathname])
   return (
      <Menu className='mt-10'>
         <Menu>
            {navigation.map((item) => {
               const isAlsoActive = !!breadcrumbs[pathname].find(({ path }) => path.includes(item.path))
               return (
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
      </Menu>
   )
}

export default SidebarMenu

const Menu = tw.ul`flex flex-col space-y-2`
const MenuItem = tw.li`whitespace-nowrap font-normal`

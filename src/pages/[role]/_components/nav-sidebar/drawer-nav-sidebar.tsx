import { cn } from '@/common/utils/cn'
import { Icon, Sheet, SheetContent } from '@/components/ui'
import React from 'react'
import { NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'

type DrawerSidebarProps = {
   open: boolean
   onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>
   navigation: Array<MenuNavigationItem>
}

const DrawerNavSidebar: React.FC<DrawerSidebarProps> = (props) => {
   return (
      <Sheet open={props.open} onOpenChange={props.onOpenStateChange}>
         <SheetContent className='w-full max-w-sm'>
            <Menu className='mt-10'>
               {Array.isArray(props.navigation) &&
                  props.navigation.map((item, index) => (
                     <MenuItem key={index}>
                        <NavLink to={item.path} className={cn('flex items-center gap-x-3 rounded-md px-3 py-2 hover:bg-muted')}>
                           <Icon name={item.icon!} size={18} /> {item.name}
                        </NavLink>
                     </MenuItem>
                  ))}
            </Menu>
         </SheetContent>
      </Sheet>
   )
}

const Menu = tw.ul`flex flex-col space-y-2`
const MenuItem = tw.li`whitespace-nowrap font-normal`

export default DrawerNavSidebar

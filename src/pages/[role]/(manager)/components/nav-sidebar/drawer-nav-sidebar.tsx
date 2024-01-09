import { Sheet, SheetContent } from '@/components/ui'
import React from 'react'
import SidebarMenu from './menu-sidebar'

type DrawerSidebarProps = {
   open: boolean
   onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>
   navigation: Array<MenuNavigationItem>
}

const DrawerNavSidebar: React.FC<DrawerSidebarProps> = (props) => {
   return (
      <Sheet open={props.open} onOpenChange={props.onOpenStateChange}>
         <SheetContent className='w-full max-w-sm'>
            <SidebarMenu navigation={props.navigation} onOpenStateChange={props.onOpenStateChange} />
         </SheetContent>
      </Sheet>
   )
}

export default DrawerNavSidebar

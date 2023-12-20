import { Button, Icon, Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui'
import React from 'react'

type Props = {}

const DrawerSidebar: React.FC<any> = (props: Props) => {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button size='icon' variant='ghost' className='rounded-full focus:border-none focus:outline-none'>
               <Icon name='Menu' />
            </Button>
         </SheetTrigger>
         <SheetContent></SheetContent>
      </Sheet>
   )
}

export default DrawerSidebar

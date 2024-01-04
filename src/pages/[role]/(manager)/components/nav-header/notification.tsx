import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Icon } from '@/components/ui'
import React from 'react'

const Notification: React.FunctionComponent = () => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild className='flex items-center space-x-6 focus:border-none focus:outline-none'>
            <Button variant='ghost' size='icon' className='rounded-full'>
               <Icon name='Bell' />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
            <DropdownMenuSeparator />
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default Notification

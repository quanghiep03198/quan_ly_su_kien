import { Box, Button, Icon, Input, Popover, PopoverContent } from '@/components/ui'
import { useState } from 'react'

const SearchBox: React.FunctionComponent = () => {
   const [open, setOpen] = useState<boolean>(false)
   
   return (
      <>
         <Box className='relative rounded-lg border duration-200 ease-in-out focus-within:border-primary'>
            <Icon name='Search' className='absolute left-2 top-1/2 -translate-y-1/2' />
            <Input className='border-none px-8' placeholder='Tìm kiếm' />
            <Button size='icon' variant='ghost' className='absolute right-2 top-1/2 aspect-square h-6 w-6 -translate-y-1/2'onClick={()=> setOpen(!open)}>
               <Icon name='SlidersHorizontal' size={14}  />
            </Button>
         </Box>
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverContent>
               
            </PopoverContent>
         </Popover>
      </>
   )
}

export default SearchBox

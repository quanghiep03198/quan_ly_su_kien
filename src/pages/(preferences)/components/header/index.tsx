import { Theme } from '@/common/constants/enums'
import useTheme from '@/common/hooks/use-theme'
import { cn } from '@/common/utils/cn'
import ThemeSelect from '@/components/shared/theme-select'
import { Box, Icon, Image, buttonVariants } from '@/components/ui'
import Tooltip from '@/components/ui/@override/tooltip'
import UserActions from '@/pages/components/user-actions'
import { Link } from 'react-router-dom'

const Header: React.FunctionComponent = () => {
   const { theme } = useTheme()

   return (
      <Box className='sticky top-0 z-20 border-b bg-background py-2'>
         <Box className='mx-auto flex max-w-7xl items-center justify-between px-4'>
            <Image src={theme === Theme.LIGHT ? '/logo.png' : '/logo.webp'} className='max-h-16 max-w-[9rem] object-contain' width='100%' height='100%' />
            <Box className='flex items-center gap-x-2'>
               <Tooltip content='Trở về màn hình chính'>
                  <Link to='/' className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
                     <Icon name='Navigation' />
                  </Link>
               </Tooltip>
               <ThemeSelect />
               <UserActions />
            </Box>
         </Box>
      </Box>
   )
}

export default Header

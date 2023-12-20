import { Theme } from '@/common/constants/enums'
import { COMMON_PATHS } from '@/common/constants/pathnames'
import useTheme from '@/common/hooks/use-theme'
import { cn } from '@/common/utils/cn'
import { Box, Icon } from '@/components/ui'
import { Link, NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const Sidebar: React.FC<{ navigation: Array<MenuNavigationItem> }> = ({ navigation }) => {
   const { theme } = useTheme()

   return (
      <Box as='aside' className='flex h-full flex-col space-y-8 border-r p-6 sm:hidden md:hidden'>
         <Link to={COMMON_PATHS.DEFAULT} className='translate-x-3'>
            <Image src={theme === Theme.LIGHT ? '/logo.png' : '/logo.webp'} />
         </Link>
         <Menu>
            {navigation.map((item, index) => (
               <MenuItem key={index}>
                  <NavLink to={item.path} className={cn('flex items-center gap-x-3 rounded-md px-3 py-2 hover:bg-muted')}>
                     <Icon name={item.icon!} size={18} /> {item.name}
                  </NavLink>
               </MenuItem>
            ))}
         </Menu>
      </Box>
   )
}

const Image = tw.img`max-w-[10rem] object-cover object-center`
const Menu = tw.ul`flex flex-col space-y-2`
const MenuItem = tw.li`whitespace-nowrap font-normal`

export default Sidebar

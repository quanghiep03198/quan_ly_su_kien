import { Theme } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import useTheme from '@/common/hooks/use-theme'
import { cn } from '@/common/utils/cn'
import { Box, Icon } from '@/components/ui'
import { buttonVariants } from '@/components/ui/@shadcn/button'
import { Link, NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const StaticNavSidebar: React.FC<{ navigation: Array<MenuNavigationItem> }> = ({ navigation }) => {
   const { theme } = useTheme()

   return (
      <Box as='aside' className='fixed left-0 top-0 flex h-full w-[320px] flex-col space-y-8 border-r p-6 sm:hidden md:hidden'>
         <Link to={Paths.DEFAULT} className='translate-x-3'>
            <Image src={theme === Theme.LIGHT ? '/logo.png' : '/logo.webp'} />
         </Link>
         <Menu>
            {navigation.map((item, index) => (
               <MenuItem key={index}>
                  <NavLink
                     to={item.path}
                     className={({ isActive }) =>
                        cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start gap-x-2 text-base font-normal', {
                           'text-primary hover:text-primary': isActive,
                           'hover:text-foreground': !isActive
                        })
                     }
                  >
                     <Icon name={item.icon!} size={18} /> {item.name}
                  </NavLink>
               </MenuItem>
            ))}
         </Menu>
      </Box>
   )
}

const Image = tw.img`max-w-[10rem] object-cover object-center`
const Menu = tw.ul`flex flex-col space-y-2 items-stretch`
const MenuItem = tw.li`whitespace-nowrap font-normal`

export default StaticNavSidebar

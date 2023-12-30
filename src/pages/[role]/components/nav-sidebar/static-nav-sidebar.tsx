import { Theme } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import useTheme from '@/common/hooks/use-theme'
import { Box } from '@/components/ui'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import SidebarMenu from './menu-sidebar'

const StaticNavSidebar: React.FC<{ navigation: Array<MenuNavigationItem> }> = ({ navigation }) => {
   const { theme } = useTheme()

   return (
      <Box as='aside' className='fixed left-0 top-0 flex h-full w-[320px] flex-col space-y-8 border-r p-6 sm:hidden md:hidden'>
         <Link to={Paths.DEFAULT} className='translate-x-3'>
            <Image src={theme === Theme.LIGHT ? '/logo.png' : '/logo.webp'} />
         </Link>
         <SidebarMenu navigation={navigation} />
      </Box>
   )
}

const Image = tw.img`max-w-[10rem] object-cover object-center`

export default StaticNavSidebar

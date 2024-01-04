import { Theme } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import useTheme from '@/common/hooks/use-theme'
import { cn } from '@/common/utils/cn'
import { Box } from '@/components/ui'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import CollapseSidebarMenu from './menu-sidebar-lg'

type StaticNavSidebarProps = {
   navigation: Array<MenuNavigationItem>
   isCollapsed: boolean
}

const getLogoImageSource = (theme: Theme, isCollapsed: boolean) => {
   switch (true) {
      case theme === Theme.LIGHT && isCollapsed:
         return '/logo-sm.png'
      case theme === Theme.DARK && isCollapsed:
         return '/logo-sm-mono.png'
      case theme === Theme.LIGHT && !isCollapsed:
         return '/logo.png'
      case theme === Theme.DARK && !isCollapsed:
         return '/logo.webp'
   }
}

const StaticNavSidebar: React.FC<StaticNavSidebarProps> = ({ navigation, isCollapsed }) => {
   const { theme } = useTheme()
   const logo = getLogoImageSource(theme, isCollapsed)

   return (
      <Box
         as='aside'
         className={cn('relative left-0 top-0 flex h-full w-[inherit] flex-col space-y-8 sm:hidden md:hidden', {
            'items-center px-2 py-6': isCollapsed,
            'p-6': !isCollapsed
         })}
      >
         <Link to={Paths.HOME} className='translate-x-3'>
            <Image
               src={logo}
               className={cn({
                  'max-w-[40px] -translate-x-3': isCollapsed,
                  'max-w-[160px]': !isCollapsed
               })}
            />
         </Link>
         <CollapseSidebarMenu isCollapsed={isCollapsed} navigation={navigation} />
      </Box>
   )
}

const Image = tw.img`object-cover object-center`

export default StaticNavSidebar

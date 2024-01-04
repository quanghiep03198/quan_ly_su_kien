import { Paths } from '@/common/constants/pathnames'
import useBreadcrumbs from '@/common/hooks/use-breadcrumbs'
import { Box, Icon } from '@/components/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const NavbarBreadcrumb: React.FunctionComponent = () => {
   const breadcrumbs = useBreadcrumbs()

   return (
      <Breadcrumb>
         <BreadcrumbItem className='text-sm font-medium' to={Paths.HOME}>
            <Icon name='Home' />
         </BreadcrumbItem>
         {Array.isArray(breadcrumbs) &&
            breadcrumbs?.map((item, index) => (
               <Box className='inline-flex items-center space-x-2' key={index}>
                  <Icon name='ChevronRight' />
                  <BreadcrumbItem to={item.path}>{item.name}</BreadcrumbItem>
               </Box>
            ))}
      </Breadcrumb>
   )
}

const Breadcrumb = tw.div`flex items-center space-x-2`
const BreadcrumbItem = tw(Link)`text-sm`

export default NavbarBreadcrumb

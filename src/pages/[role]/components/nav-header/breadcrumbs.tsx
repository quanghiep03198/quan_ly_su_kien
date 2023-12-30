import { Paths } from '@/common/constants/pathnames'
import { Box, Icon } from '@/components/ui'
import { breadcrumbs } from '@/configs/breadcrumbs'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const NavbarBreadcrumb: React.FunctionComponent = () => {
   const { pathname } = useLocation()

   return (
      <Breadcrumb>
         <BreadcrumbItem className='text-sm font-medium' to={Paths.DEFAULT}>
            <Icon name='Home' />
         </BreadcrumbItem>
         {breadcrumbs[pathname]?.map((item) => (
            <Box className='inline-flex items-center space-x-2' key={pathname}>
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

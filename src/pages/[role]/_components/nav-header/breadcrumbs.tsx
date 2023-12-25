import { Paths } from '@/common/constants/pathnames'
import { Box, Icon } from '@/components/ui'
import { metadata } from '@/configs/metadata.config'
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
         <Icon name='ChevronRight' />
         <BreadcrumbItem to={pathname}>{metadata[pathname as keyof typeof metadata]}</BreadcrumbItem>
      </Breadcrumb>
   )
}

const Breadcrumb = tw(Box)`flex items-center space-x-2`
const BreadcrumbItem = tw(Link)`text-sm`

export default NavbarBreadcrumb

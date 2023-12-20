import { COMMON_PATHS } from '@/common/constants/pathnames'
import { Box, Icon } from '@/components/ui'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const NavbarBreadcrumb: React.FC<any> = () => {
   const { pathname } = useLocation()

   return (
      <Breadcrumb>
         <BreadcrumbItem className='text-sm font-medium' to={COMMON_PATHS.DEFAULT}>
            <Icon name='Home' />
         </BreadcrumbItem>
         <Icon name='ChevronRight' />
         <BreadcrumbItem to='/'>Quản lý sinh viên</BreadcrumbItem>
         <Icon name='ChevronRight' />
         <BreadcrumbItem to='/'>Thêm mới</BreadcrumbItem>
      </Breadcrumb>
   )
}

const Breadcrumb = tw(Box)`flex items-center space-x-2`
const BreadcrumbItem = tw(Link)`text-sm`

export default NavbarBreadcrumb

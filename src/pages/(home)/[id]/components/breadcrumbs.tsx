import { Paths } from '@/common/constants/pathnames'
import { Box } from '@/components/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const Breadcrumbs: React.FC<{ currentPath: string; name: string }> = ({ name, currentPath }) => {
   return (
      <Box className='flex items-center gap-x-2'>
         <Link className='underline-offset-2 hover:underline' to={Paths.HOME}>
            Trang chủ
         </Link>
         <Slash>/</Slash>
         <Link className='underline-offset-2 hover:underline' to={Paths.HOME}>
            Sự kiện
         </Link>
         <Slash>/</Slash>
         <Link className='underline-offset-2 hover:underline' to={currentPath}>
            {name}
         </Link>
      </Box>
   )
}

const Slash = tw.span`select-none`

export default Breadcrumbs

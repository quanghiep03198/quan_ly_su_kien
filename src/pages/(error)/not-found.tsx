/* eslint-disable */

import { Paths } from '@/common/constants/pathnames'
import { Button, Icon } from '@/components/ui'
import { Box } from '@/components/ui/@custom/box'
import { Typography } from '@/components/ui/@custom/typography'
import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const NotFound: React.FunctionComponent = () => {
   return (
      <Box className='relative mx-auto flex h-screen w-full max-w-full flex-col items-center justify-center gap-y-6'>
         <Code>404</Code>
         <Typography variant='heading3' className='block text-center'>
            Page not found
         </Typography>
         <Paragraph>Xin lỗi, chúng tôi không tìm thấy trang bạn yêu cầu.</Paragraph>
         <Box className='flex items-center justify-center space-x-1'>
            <Button asChild variant='default' className='gap-x-2'>
               <Link to={Paths.REDIRECT}>
                  <Icon name='Home' />
                  Về trang chủ
               </Link>
            </Button>

            <Button variant='ghost' className=' gap-x-2'>
               <Icon name='ArrowRight' />
               Liên hệ hỗ trợ
            </Button>
         </Box>
      </Box>
   )
}

const Code = tw.span`text-destructive text-xl font-bold text-center`
const Paragraph = tw.p`text-center text-lg sm:text-base text-gray-500 mb-6`

export default NotFound

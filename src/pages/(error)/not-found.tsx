import { COMMON_PATHS } from '@/common/constants/pathnames'
import { Button, Icon } from '@/components/ui'
import { Box } from '@/components/ui/box'
import { Typography } from '@/components/ui/typography'
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
            <Link to={COMMON_PATHS.DEFAULT}>
               <Button variant='default' className='inline-flex items-center gap-x-2'>
                  <Icon name='Home' />
                  Về trang chủ
               </Button>
            </Link>
            <Link to={COMMON_PATHS.DEFAULT}>
               <Button variant='ghost' className='inline-flex items-center gap-x-2'>
                  <Icon name='ArrowRight' />
                  Liên hệ hỗ trợ
               </Button>
            </Link>
         </Box>
      </Box>
   )
}

const Code = tw.span`text-destructive text-xl font-bold text-center`
const Paragraph = tw.p`text-center text-lg sm:text-base text-gray-500 mb-6`

export default NotFound

import { Badge, Box, Button, DropdownSelect, Form, Icon, Input, Typography } from '@/components/ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import tw from 'tailwind-styled-components'

const locationOptions: Record<'label' | 'value', string>[] = [
   { label: 'Hà Nội', value: 'Hà Nội' },
   { label: 'Hải Phòng', value: 'Hải Phòng' },
   { label: 'Đà Nẵng', value: 'Đà Nẵng' },
   { label: 'Hồ Chí Minh', value: 'Hồ Chí Minh' },
   { label: 'Cần Thơ', value: 'Cần Thơ' }
]

const postedTimeOptions: Record<'label' | 'value', string>[] = [
   { label: 'Mới nhất', value: 'desc' },
   { label: 'Cũ nhất', value: 'asc' }
]

const keywords = ['Happy Bee', 'Hackathon', 'Poly Microsoft Office', 'Poly Running']
const SearchBox = () => {
   return (
      <Box className='space-y-6'>
         <Box className='flex items-center justify-start gap-x-2'>
            <Box className='relative'>
               <Input className='pl-8' placeholder='Tên sự kiện ...' />
               <Icon name='Search' className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground/50' />
            </Box>
            <DropdownSelect className='w-56' options={locationOptions} placeholder='Địa điểm' />
            <DropdownSelect className='w-56' options={postedTimeOptions} placeholder='Ngày đăng' />
         </Box>
         <Box className='flex items-center gap-x-4'>
            <Typography variant='heading6' className='text-base'>
               Đề xuất cho bạn
            </Typography>
            <Box className='space-x-1'>
               {keywords.map((item) => (
                  <Badge variant='secondary' key={item} className='cursor-pointer'>
                     {item}
                  </Badge>
               ))}
            </Box>
         </Box>
      </Box>
   )
}

export default SearchBox

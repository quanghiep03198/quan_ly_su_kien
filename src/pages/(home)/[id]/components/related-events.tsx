import { Paths } from '@/common/constants/pathnames'
import { EventType } from '@/common/types/entities'
import { Box, Image, Typography } from '@/components/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const data: Partial<EventType>[] = [
   {
      id: 1,
      name: 'Happy Bee 10',
      banner: 'https://caodang.fpt.edu.vn/wp-content/uploads/KEM_0096-770x500.jpg',
      content: '',
      description: 'Sự kiện âm nhạc thường niên tại FPoly',
      user: {
         name: 'John Wick'
      }
   },
   {
      id: 2,
      name: 'Happy Bee 11',
      banner: 'https://caodang.fpt.edu.vn/wp-content/uploads/KEM_0096-770x500.jpg',
      content: '',
      description: 'Sự kiện âm nhạc thường niên tại FPoly',
      user: {
         name: 'John Wick'
      }
   },
   {
      id: 3,
      name: 'Happy Bee 12',
      banner: 'https://caodang.fpt.edu.vn/wp-content/uploads/KEM_0096-770x500.jpg',
      content: '',
      description: 'Sự kiện âm nhạc thường niên tại FPoly',
      user: {
         name: 'John Wick'
      }
   },
   {
      id: 4,
      name: 'Happy Bee 13',
      banner: 'https://caodang.fpt.edu.vn/wp-content/uploads/KEM_0096-770x500.jpg',
      content: '',
      description: 'Sự kiện âm nhạc thường niên tại FPoly',
      user: {
         name: 'John Wick'
      }
   },
   {
      id: 5,
      name: 'Happy Bee 14',
      banner: 'https://caodang.fpt.edu.vn/wp-content/uploads/KEM_0096-770x500.jpg',
      content: '',
      description: 'Sự kiện âm nhạc thường niên tại FPoly',
      user: {
         name: 'John Wick'
      }
   }
]

const RelatedEvents: React.FunctionComponent = () => {
   return (
      <Box className='flex flex-col items-stretch gap-y-6'>
         <Typography variant='heading6'>Sự kiện liên quan</Typography>
         {Array.isArray(data) &&
            data.map((item) => (
               <Box className='flex gap-x-4'>
                  <Image src={item.banner} width={96} height={96} className='aspect-square rounded object-cover object-center' />
                  <Box className='space-y-2'>
                     <Link to={Paths.HOME + '/' + item.id}>
                        <Typography>{item.name}</Typography>
                     </Link>
                     <Paragraph>{item.description}</Paragraph>
                  </Box>
               </Box>
            ))}
      </Box>
   )
}

const Paragraph = tw.p`text-sm line-clamp-3`

export default RelatedEvents

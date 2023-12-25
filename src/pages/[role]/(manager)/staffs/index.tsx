import { Paths } from '@/common/constants/pathnames'
import { Box, Button, DataTable, Icon } from '@/components/ui'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const StaffsList: React.FunctionComponent = () => {
   return (
      <Box className='flex flex-col gap-y-6'>
         <Box className='flex items-center justify-end'>
            <Button variant='outline' className='gap-x-2'>
               <Icon name='PlusCircle' />
               Thêm mới
            </Button>
         </Box>
         <DataTable />
      </Box>
   )
}

export default StaffsList

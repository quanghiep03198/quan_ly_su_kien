import { toast } from '@/common/hooks/use-toast'
import { Event } from '@/common/types/entities'
import Tooltip from '@/components/customs/tooltip'
import { Box, Button, Icon } from '@/components/ui'
import { DataTable } from '@/components/ui/data-table'
import { useDeleteEventMutation, useGetEventsQuery } from '@/redux/apis/event.api'
import { createColumnHelper } from '@tanstack/react-table'
import moment from 'moment'
import React from 'react'

const EventList: React.FunctionComponent = () => {
   const { data } = useGetEventsQuery(undefined, { refetchOnMountOrArgChange: true })
   const [deleteEvent] = useDeleteEventMutation()
   const columnHelper = createColumnHelper<Event>()

   const handleDeleteEvent = async (id: number) => {
      try {
         const response = await deleteEvent(id).unwrap()
         toast({ description: response.message })
      } catch (error) {
         const errorResponse = error as ErrorResponse
         toast({ description: errorResponse.data.message })
      }
   }

   const columns = [
      columnHelper.accessor('name', {
         header: 'Tên sự kiện'
      }),
      columnHelper.accessor('location', {
         header: 'Địa điểm'
      }),
      columnHelper.accessor('attendances_count', {
         header: 'Số người tham gia'
      }),
      columnHelper.accessor('start_time', {
         header: 'Thời gian bắt đầu',
         cell: (cell) => moment(cell.getValue()).format('DD/MM/YYYY')
      }),
      columnHelper.accessor('end_time', {
         header: 'Thời gian kết thúc',
         cell: (cell) => moment(cell.getValue()).format('DD/MM/YYYY')
      }),
      columnHelper.accessor('id', {
         header: 'Thao tác',
         cell: (cell) => {
            const id = cell.getValue()

            return (
               <Box className='flex items-center gap-px'>
                  <Tooltip content='Sửa'>
                     <Button size='icon' variant='ghost'>
                        <Icon name='Pencil' />
                     </Button>
                  </Tooltip>
                  <Tooltip content='Xóa'>
                     <Button size='icon' className='text-destructive hover:text-destructive' variant='ghost' onClick={() => handleDeleteEvent(id)}>
                        <Icon name='Trash2' />
                     </Button>
                  </Tooltip>
               </Box>
            )
         }
      })
   ]

   return <DataTable columns={columns} data={data?.metadata} />
}

export default EventList

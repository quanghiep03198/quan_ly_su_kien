import { EventStatus } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import useServerPagination from '@/common/hooks/use-server-pagination'
import { EventType } from '@/common/types/entities'
import { Badge, Box, Button, DataTable, DataTableRowActions, Icon, Typography } from '@/components/ui'
import ConfirmDialog from '@/components/ui/@override/confirm-dialog'
import { useDeleteEventMutation, useGetEventsQuery } from '@/redux/apis/event.api'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import _ from 'lodash'
import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const EventList: React.FunctionComponent = () => {
   const [pagination, handlePaginate] = useServerPagination()
   const { data, isFetching } = useGetEventsQuery({ page: pagination.page, limit: pagination.limit })
   const [deleteEvent] = useDeleteEventMutation()
   const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
   const [confirmDialogOpenState, setConfirmDialogOpenState] = useState<boolean>(false)
   const navigate = useNavigate()

   const handleDeleteButtonClick = (id: number) => {
      setConfirmDialogOpenState(true)
      setSelectedRowId(id)
   }

   const handleDeleteEvent = useCallback(async () => {
      try {
         const response = await deleteEvent(selectedRowId).unwrap()
         toast.success(response.message)
      } catch (error) {
         const errorResponse = error as ErrorResponse
         toast.error(errorResponse.data.message)
      } finally {
         setSelectedRowId(null)
      }
   }, [selectedRowId])

   const columnHelper = createColumnHelper<EventType>()

   const columns = [
      columnHelper.accessor('name', {
         header: 'Tên sự kiện',
         enableSorting: true,
         enableColumnFilter: true
      }),
      columnHelper.accessor('contact', {
         header: 'Số điện thoại liên hệ',
         enableColumnFilter: true
      }),
      columnHelper.accessor('location', {
         header: 'Địa điểm',
         enableColumnFilter: true,
         minSize: 384
      }),
      columnHelper.accessor('attendances_count', {
         header: 'Số người tham gia',
         enableSorting: true,
         enableColumnFilter: true,
         filterFn: 'inNumberRange'
      }),
      columnHelper.accessor('start_time', {
         header: 'Thời gian bắt đầu'
      }),
      columnHelper.accessor('end_time', {
         header: 'Thời gian kết thúc'
      }),
      columnHelper.accessor('status', {
         header: 'Trạng thái',
         enableColumnFilter: true,
         filterFn: 'equals',
         cell: ({ getValue }) => {
            const value = getValue()
            return (
               <Badge className='whitespace-nowrap' variant={value === EventStatus.ACTIVE ? 'success' : 'destructive'}>
                  {value}
               </Badge>
            )
         }
      }),
      columnHelper.accessor('id', {
         header: 'Thao tác',
         cell: ({ cell }) => {
            const id = cell.getValue()
            return (
               <DataTableRowActions
                  canViewDetails={true}
                  canEdit={true}
                  canDelete={true}
                  onViewDetails={() => navigate(Paths.EVENT_STATISTICS_DETAILS.replace(':id', id))}
                  onEdit={() => navigate(Paths.EVENTS_UPDATE.replace(':id', id))}
                  onDelete={() => handleDeleteButtonClick(id)}
               />
            )
         }
      })
   ] as ColumnDef<EventType, any>[]

   return (
      <Box className='flex h-full flex-col space-y-4'>
         <Box className='mb-4 flex items-center justify-between'>
            <Typography variant='heading6'>Danh sách sự kiện</Typography>
            <Link to={Paths.EVENTS_CREATE}>
               <Button variant='outline' className='gap-x-2'>
                  <Icon name='PlusCircle' />
                  Thêm mới
               </Button>
            </Link>
         </Box>
         <DataTable
            columns={columns}
            data={data?.docs!}
            loading={isFetching}
            manualPagination={true}
            paginationState={{
               ...pagination,
               ..._.omit(data, ['docs'])
            }}
            onManualPaginate={handlePaginate}
         />
         <ConfirmDialog
            open={confirmDialogOpenState}
            onOpenStateChange={setConfirmDialogOpenState}
            title='Bạn chắc chắn muốn xóa sự kiện này?'
            description='Sự kiện này sau khi xóa khỏi hệ thống sẽ không thể được khôi phục.'
            onConfirm={handleDeleteEvent}
         />
      </Box>
   )
}

export default EventList

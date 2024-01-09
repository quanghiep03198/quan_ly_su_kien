import { EventStatusValues } from '@/common/constants/constants'
import { EventStatus } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import { EventType } from '@/common/types/entities'
import { Badge, Box, Button, DataTable, DataTableRowActions, Icon, Typography } from '@/components/ui'
import ConfirmDialog from '@/components/ui/@override/confirm-dialog'
import { useDeleteEventMutation, useGetEventsQuery } from '@/redux/apis/event.api'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import React, { useCallback, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type EventListWithoutPagination = Exclude<OptionalPagination<EventType>, Pagination<EventType>>

const EventList: React.FunctionComponent = () => {
   const { data, isFetching } = useGetEventsQuery({ pagination: false })
   const [deleteEvent] = useDeleteEventMutation()
   const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
   const [confirmDialogOpenState, setConfirmDialogOpenState] = useState<boolean>(false)
   const navigate = useNavigate()

   const eventsList = useMemo(() => data as EventListWithoutPagination, [data])

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
         enableColumnFilter: true,
         size: 160
      }),
      columnHelper.accessor('contact', {
         header: 'Số điện thoại liên hệ',
         enableColumnFilter: true,
         size: 160
      }),
      columnHelper.accessor('location', {
         header: 'Địa điểm',
         enableColumnFilter: true,
         size: 160
      }),

      columnHelper.accessor('start_time', {
         header: 'Thời gian bắt đầu',
         enableSorting: true,
         enableMultiSort: true,
         cell: ({ getValue }) => {
            const value = getValue()
            return format(value, 'dd/MM/yyyy')
         }
      }),
      columnHelper.accessor('end_time', {
         header: 'Thời gian kết thúc',
         enableSorting: true,
         enableMultiSort: true,
         cell: ({ getValue }) => {
            const value = getValue()
            return format(value, 'dd/MM/yyyy')
         }
      }),
      columnHelper.accessor('status', {
         header: 'Trạng thái',
         enableColumnFilter: true,
         filterFn: 'equals',
         cell: ({ getValue }) => {
            const value = getValue()
            return (
               <Badge className='whitespace-nowrap' variant={value === EventStatusValues.get(EventStatus.ACTIVE) ? 'success' : 'destructive'}>
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
         <DataTable columns={columns} data={eventsList!} loading={isFetching} />
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

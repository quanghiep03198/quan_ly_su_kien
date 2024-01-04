import { UserType } from '@/common/types/entities'
import { Avatar, AvatarImage, Box, Button, DataTable, DataTableRowActions, Icon } from '@/components/ui'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useCallback, useState } from 'react'
import { toast } from 'sonner'
import AddAttendeeFormModal from './add-attendee-form-modal'
import { format } from 'date-fns'
import { useRemoveAttendanceFromEventMutation } from '@/redux/apis/attendance.api'
import UpdateAttendeeFormModal from './update-attendee-form-modal'

type Atteendees = {
   id: number
   event_id: number
   user: Partial<UserType>
   created_at: Date
   updated_at: Date
}

const ParticipantsList: React.FC<{ data: Partial<UserType>[] }> = ({ data }) => {
   const [addFormOpenState, setAddFormOpenState] = useState<boolean>(false)
   const [updateFormOpenState, setUpdateFormOpenState] = useState<boolean>(false)

   const [attendeeToUpdate, setAttendeeToUpdate] = useState<Partial<UserType> | null>(null)

   const columnHelper = createColumnHelper<Atteendees>()

   const handleOpenAddFormModal = useCallback(setAddFormOpenState, [])
   const handleOpenUpdateFormModal = useCallback(setUpdateFormOpenState, [])

   const [removeAttendee] = useRemoveAttendanceFromEventMutation()

   const handleRemoveAttendeeFromEvent = useCallback(
      (id: number) =>
         toast.promise(removeAttendee(id), {
            loading: 'Đang rút sinh viên ra khỏi danh sách ...',
            success: 'Sinh viên đã được rút khỏi danh sách tham gia',
            error: 'Đã có lỗi xảy ra'
         }),
      []
   )

   const columns = [
      columnHelper.accessor('user.name', {
         header: 'Họ tên',
         enableColumnFilter: true,
         size: 384,
         cell: ({ getValue, row }) => {
            const username = getValue()
            return (
               <Box className='flex items-center gap-x-2'>
                  <Avatar>
                     <AvatarImage src={row.original?.user?.avatar} />
                  </Avatar>
                  {username as string}
               </Box>
            )
         }
      }),
      columnHelper.accessor('user.email', {
         header: 'Email',
         enableColumnFilter: true
      }),
      columnHelper.accessor('user.phone', {
         header: 'Số điện thoại',
         enableColumnFilter: true
      }),
      columnHelper.accessor('created_at', {
         header: 'Ngày tham gia',
         enableColumnFilter: true,
         cell: ({ getValue }) => {
            const value = getValue()
            return format(value, 'dd/MM/yyyy')
         }
      }),
      columnHelper.accessor('id', {
         header: 'Thao tác',
         cell: ({ getValue, row }) => {
            const id = getValue()
            return (
               <DataTableRowActions
                  canEdit={true}
                  canDelete={true}
                  onEdit={() => {
                     setAttendeeToUpdate(row.original.user)
                     handleOpenUpdateFormModal(true)
                  }}
                  onDelete={() => handleRemoveAttendeeFromEvent(id)}
               />
            )
         }
      })
   ] as ColumnDef<Partial<UserType>>[]

   return (
      <Box className='flex flex-col gap-y-6'>
         <DataTable
            columns={columns}
            data={data}
            loading={false}
            slot={
               <Button variant='outline' className='gap-x-2 text-xs' size='sm' onClick={() => handleOpenAddFormModal(!addFormOpenState)}>
                  <Icon name='PlusCircle' /> Thêm người tham gia
               </Button>
            }
         />
         <AddAttendeeFormModal open={addFormOpenState} onOpenChange={handleOpenAddFormModal} />
         <UpdateAttendeeFormModal open={updateFormOpenState} onOpenChange={handleOpenUpdateFormModal} defaultValue={attendeeToUpdate!} />
      </Box>
   )
}

export default ParticipantsList

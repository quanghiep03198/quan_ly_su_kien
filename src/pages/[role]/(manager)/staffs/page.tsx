import { UserRoleValues } from '@/common/constants/constants'
import { UserRoleEnum } from '@/common/constants/enums'
import { UserType } from '@/common/types/entities'
import { Avatar, AvatarFallback, AvatarImage, Badge, Box, Button, DataTable, DataTableRowActions, Icon, Typography } from '@/components/ui'
import ConfirmDialog from '@/components/ui/@override/confirm-dialog'
import { useDeleteUserMutation, useGetUsersQuery } from '@/redux/apis/user.api'
import { useAppSelector } from '@/redux/hook'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'
import UpdateUserFormModal from '../components/shared/update-form-modal'
import CreateFormModal from './components/create-form-modal'

const StaffsList: React.FunctionComponent = () => {
   const user = useAppSelector((state) => state.auth.user)
   const { data, isLoading } = useGetUsersQuery({ pagination: false, role: UserRoleEnum.STAFF })
   const [openConfirmState, setOpenConfirmState] = useState<boolean>(false)
   const [createFormOpenState, setCreateFormOpenState] = useState<boolean>(false)
   const [updateFormOpenState, setUpdateFormOpenState] = useState<boolean>(false)
   const [userToUpdate, setUserToUpdate] = useState<Partial<UserType>>({})
   const [selectedRowId, setSelectedRowId] = useState<number | null>(null)
   const participants = useMemo(() => (Array.isArray(data) ? data.filter((participant) => participant.id !== user?.id) : []), [data])

   const [deleteParticipant] = useDeleteUserMutation()
   const columnHelper = createColumnHelper<Omit<UserType, 'password'>>()

   const handleDeleteUser = async () => {
      try {
         if (selectedRowId) {
            await deleteParticipant(selectedRowId).unwrap()
            toast.success('Đã xóa cộng tác viên')
         }
      } catch (error) {
         toast.error('Xóa cộng tác viên thất bại')
      } finally {
         setOpenConfirmState(false)
         setSelectedRowId(null)
      }
   }

   const handleUpdateButtonClick = (participant: Partial<UserType>) => {
      setUserToUpdate(participant)
      setUpdateFormOpenState(true)
   }

   const columns = [
      columnHelper.accessor('name', {
         header: 'Họ tên',
         enableColumnFilter: true,
         enableSorting: true,
         cell: ({ row }) => (
            <Box className='flex items-center gap-x-2'>
               <Avatar className='z-0 items-center'>
                  <AvatarImage className='relative z-[0] aspect-[1] h-8 w-8 rounded-full' src={row.original?.avatar} />
                  <AvatarFallback>F</AvatarFallback>
               </Avatar>
               <span className='whitespace-nowrap'>{row.original?.name}</span>
            </Box>
         )
      }),
      columnHelper.accessor('email', {
         header: 'Email',
         enableColumnFilter: true,
         enableSorting: true
      }),
      columnHelper.accessor('phone', {
         header: 'Số điện thoại',
         enableColumnFilter: true,
         enableSorting: true
      }),
      columnHelper.accessor('role', {
         header: 'Vai trò',
         enableColumnFilter: true,
         filterFn: 'equals',
         cell: (metadata) => (
            <Badge variant='outline' className='whitespace-nowrap capitalize'>
               {UserRoleValues.get(metadata.getValue())}
            </Badge>
         )
      }),
      columnHelper.accessor('id', {
         header: 'Thao tác',
         cell: (metadata) => {
            const id = metadata.getValue()
            return (
               <DataTableRowActions
                  canEdit
                  canDelete
                  onEdit={() => handleUpdateButtonClick(metadata.row.original)}
                  onDelete={() => {
                     setOpenConfirmState(true)
                     setSelectedRowId(id)
                  }}
               />
            )
         }
      })
   ] as ColumnDef<Omit<UserType, 'password'>>[]

   return (
      <>
         <Box className='flex flex-col items-stretch gap-y-6'>
            <Box className='flex items-center justify-between'>
               <Typography variant='heading6'>Danh sách cộng tác viên</Typography>
               <Button variant='outline' className='gap-x-2' onClick={() => setCreateFormOpenState(true)}>
                  <Icon name='PlusCircle' />
                  Thêm mới
               </Button>
            </Box>
            <DataTable data={participants} loading={isLoading} columns={columns} />
         </Box>

         <ConfirmDialog
            open={openConfirmState}
            onOpenStateChange={setOpenConfirmState}
            title='Bạn chắc chắn muốn tiếp tục?'
            description='Hành động này không thể khôi phục. Người dùng này sẽ bị xóa vĩnh viễn khỏi hệ thống.'
            onConfirm={handleDeleteUser}
         />
         <CreateFormModal openState={createFormOpenState} onOpenStateChange={setCreateFormOpenState} />
         <UpdateUserFormModal openState={updateFormOpenState} onOpenStateChange={setUpdateFormOpenState} defaultValue={userToUpdate} />
      </>
   )
}

export default StaffsList

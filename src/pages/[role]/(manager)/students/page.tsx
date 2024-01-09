import { UserRoleValues } from '@/common/constants/constants'
import { UserRoleEnum } from '@/common/constants/enums'
import { UserType } from '@/common/types/entities'
import { Avatar, AvatarFallback, AvatarImage, Badge, Box, DataTable, DataTableRowActions, Typography } from '@/components/ui'
import ConfirmDialog from '@/components/ui/@override/confirm-dialog'
import { useDeleteUserMutation, useGetUsersQuery } from '@/redux/apis/user.api'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import UpdateUserFormModal from '../components/shared/update-form-modal'

type TableDataType = UserType & { index: number }

const StudentsList: React.FunctionComponent = () => {
   const { data, isLoading } = useGetUsersQuery({ role: UserRoleEnum.STUDENT, pagination: false })
   const studentsList = useMemo(() => (Array.isArray(data) ? data.map((student: UserType, index: number) => ({ index: index + 1, ...student })) : []), [data])
   const [openConfirmState, setOpenConfirmState] = useState<boolean>(false)
   const [updateFormOpenState, setUpdateFormOpenState] = useState<boolean>(false)
   const [userToUpdate, setUserToUpdate] = useState<Partial<UserType>>({})
   const [selectedRowId, setSelectedRowId] = useState<number | null>(null)

   const [deleteUser] = useDeleteUserMutation()

   const columnHelper = createColumnHelper<TableDataType>()

   const handleDeleteUser = async () => {
      try {
         if (selectedRowId) {
            await deleteUser(selectedRowId).unwrap()
            toast.success('Đã xóa sinh viên')
         }
      } catch (error) {
         toast.error('Xóa sinh viên thất bại')
      } finally {
         setOpenConfirmState(false)
         setSelectedRowId(null)
      }
   }

   const columns = [
      columnHelper.accessor('name', {
         header: 'Họ tên',
         enableColumnFilter: true,
         enableSorting: true,
         cell: ({ row }) => {
            return (
               <Box className='flex items-center gap-x-2'>
                  <Avatar>
                     <AvatarImage src={row.original.avatar} />
                     <AvatarFallback>{row.original?.name?.charAt(0) ?? 'A'}</AvatarFallback>
                  </Avatar>
                  <span className='whitespace-nowrap'>{row.original.name}</span>
               </Box>
            )
         }
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
         filterFn: 'equals',
         enableGlobalFilter: false,
         cell: (metadata) => (
            <Badge variant='outline' className='whitespace-nowrap capitalize'>
               {UserRoleValues.get(metadata.getValue())}
            </Badge>
         )
      }),
      columnHelper.accessor('created_at', {
         header: 'Ngày tham gia',
         enableColumnFilter: true,
         enableSorting: true,
         enableGlobalFilter: false,
         filterFn: 'fuzzy',
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
                  canEdit
                  canDelete
                  onEdit={() => {
                     setUserToUpdate(row.original)
                  }}
                  onDelete={() => {
                     setSelectedRowId(id)
                     setOpenConfirmState(true)
                  }}
               />
            )
         }
      })
   ] as ColumnDef<TableDataType>[]

   return (
      <>
         <Box className='space-y-6'>
            <Typography variant='heading6'>Danh sách sinh viên</Typography>
            <DataTable columns={columns} data={studentsList} loading={isLoading} />
         </Box>
         <ConfirmDialog
            open={openConfirmState}
            onOpenStateChange={setOpenConfirmState}
            title='Bạn chắc chắn muốn tiếp tục?'
            description='Hành động này không thể khôi phục. Người dùng này sẽ bị xóa vĩnh viễn khỏi hệ thống.'
            onConfirm={handleDeleteUser}
         />
         <UpdateUserFormModal openState={updateFormOpenState} onOpenStateChange={setUpdateFormOpenState} defaultValue={userToUpdate} />
      </>
   )
}

export default StudentsList

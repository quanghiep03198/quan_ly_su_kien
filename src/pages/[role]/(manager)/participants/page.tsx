import { UserRoleValues } from '@/common/constants/constants'
import { UserType } from '@/common/types/entities'
import { Avatar, AvatarFallback, AvatarImage, Badge, Box, Button, DataTable, DataTableRowActions, Icon, Typography } from '@/components/ui'
import { useDeleteParticipantMutation, useGetParticipantsQuery } from '@/redux/apis/participant.api'
import { useAppSelector } from '@/redux/hook'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import { toast } from 'sonner'
import CreateFormModal from './components/create-form-modal'
import UpdateFormModal from './components/update-form-modal'
import { UserRoleEnum } from '@/common/constants/enums'

const StaffsList: React.FunctionComponent = () => {
   const user = useAppSelector((state) => state.auth.user)
   const { data, isLoading } = useGetParticipantsQuery({ pagination: false })
   const [createFormOpenState, setCreateFormOpenState] = useState<boolean>(false)
   const [updateFormOpenState, setUpdateFormOpenState] = useState<boolean>(false)
   const [participantToUpdate, setParticipantToUpdate] = useState<Partial<UserType>>({})

   const participants = useMemo(
      () => (Array.isArray(data) ? data.filter((participant) => participant.role === UserRoleEnum.STAFF && participant.id !== user?.id) : []),
      [data]
   )

   const [deleteParticipant] = useDeleteParticipantMutation()
   const columnHelper = createColumnHelper<Omit<UserType, 'password'>>()

   const handleDeleteParticipant = async (id: number) => {
      try {
         await deleteParticipant(id).unwrap()
         toast.success('Đã xóa cộng tác viên')
      } catch (error) {
         toast.error('Xóa cộng tác viên thất bại')
      }
   }

   const handleUpdateButtonClick = (participant: Partial<UserType>) => {
      setParticipantToUpdate(participant)
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
      ,
      columnHelper.accessor('id', {
         header: 'Thao tác',
         cell: (metadata) => {
            const id = metadata.getValue()
            return (
               <DataTableRowActions
                  canEdit
                  canDelete
                  onEdit={() => handleUpdateButtonClick(metadata.row.original)}
                  onDelete={() => handleDeleteParticipant(id)}
               />
            )
         }
      })
   ] as ColumnDef<Omit<UserType, 'password'>>[]

   return (
      <>
         <Box className='flex flex-col items-stretch gap-y-6'>
            <Box className='flex items-center justify-between'>
               <Typography variant='heading6'>Danh sách CTV</Typography>
               <Button variant='outline' className='gap-x-2' onClick={() => setCreateFormOpenState(true)}>
                  <Icon name='PlusCircle' />
                  Thêm mới
               </Button>
            </Box>
            <DataTable data={participants} loading={isLoading} columns={columns} />
         </Box>
         <CreateFormModal openState={createFormOpenState} onOpenStateChange={setCreateFormOpenState} />
         <UpdateFormModal openState={updateFormOpenState} onOpenStateChange={setUpdateFormOpenState} defaultValue={participantToUpdate} />
      </>
   )
}

export default StaffsList
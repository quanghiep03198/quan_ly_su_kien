import { UserRoleValues } from '@/common/constants/constants'
import { UserRoleEnum } from '@/common/constants/enums'
import { UserType } from '@/common/types/entities'
import ErrorBoundary from '@/components/exceptions/error-boundary'
import { Box, Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, Form, InputFieldControl, SelectFieldControl } from '@/components/ui'
import { useUpdateUserMutation } from '@/redux/apis/user.api'
import { UserSchema } from '@/schemas/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import { z } from 'zod'

type FormValue = z.infer<typeof UserSchema>

type Props = {
   openState: boolean
   defaultValue: Partial<UserType>
   onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateUserFormModal: React.FC<Props> = (props) => {
   const form = useForm<FormValue>({
      resolver: zodResolver(UserSchema)
   })
   const [updateParticipant, { isLoading }] = useUpdateUserMutation()

   useEffect(() => {
      form.reset(props.defaultValue)
   }, [props.defaultValue])

   const handleUpdateParticipant = async (data: FormValue) => {
      try {
         await updateParticipant({ id: props.defaultValue?.id!, payload: data }).unwrap()
         form.reset()
         props.onOpenStateChange(!props.openState)
         toast.success('Dã cập nhật thông tin người dùng')
      } catch (error) {
         toast.error('Cập nhật thông tin cộng tác viên thất bại')
      }
   }

   const roleOptions = Array.from(UserRoleValues, ([value, label]) => {
      if (value !== UserRoleEnum.STUDENT) return { value: value.toString(), label }
   }) as Record<'label' | 'value', string>[]

   return (
      <Dialog open={props.openState} onOpenChange={props.onOpenStateChange}>
         <DialogContent>
            <Box className='max-h-[80vh] overflow-y-auto scrollbar-none'>
               <DialogHeader className='text-left'>Thêm mới</DialogHeader>
               <DialogDescription>Nhập các thông tin dưới đây để invite thêm cộng tác viên</DialogDescription>
               <ErrorBoundary>
                  <Form {...form}>
                     <DialogForm onSubmit={form.handleSubmit(handleUpdateParticipant)} encType='multipart/form-data'>
                        <InputFieldControl name='name' control={form.control} label='Họ tên' />
                        <InputFieldControl name='email' control={form.control} label='Email' />
                        <InputFieldControl name='phone' control={form.control} label='Số điện thoại' />
                        <SelectFieldControl name='role' control={form.control} options={roleOptions} label='Trạng thái' placeholder='Trạng thái' />

                        <DialogFooter className='mt-6 flex flex-row items-center justify-end space-x-2'>
                           <Button type='button' variant='outline' onClick={() => props.onOpenStateChange(!props.openState)}>
                              Hủy
                           </Button>
                           <Button type='submit' disabled={isLoading}>
                              Cập nhật
                           </Button>
                        </DialogFooter>
                     </DialogForm>
                  </Form>
               </ErrorBoundary>
            </Box>
         </DialogContent>
      </Dialog>
   )
}

const DialogForm = tw.form`flex flex-col gap-4 py-4`

export default UpdateUserFormModal

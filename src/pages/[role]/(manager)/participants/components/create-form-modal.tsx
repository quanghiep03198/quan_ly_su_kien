import { UserRoleValues } from '@/common/constants/constants'
import ErrorBoundary from '@/components/exceptions/error-boundary'
import {
   Box,
   Button,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   Form,
   Input,
   InputFieldControl,
   SelectFieldControl
} from '@/components/ui'
import { useCreateEventMutation } from '@/redux/apis/event.api'
import { useAddParticipantMutation } from '@/redux/apis/participant.api'
import { UserSchema } from '@/schemas/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import { z } from 'zod'

type FormValue = z.infer<typeof UserSchema>

export type Props = {
   openState: boolean
   onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateFormModal: React.FC<Props> = (props) => {
   const form = useForm<FormValue>({
      resolver: zodResolver(UserSchema)
   })
   const [addParticipant, { isLoading }] = useAddParticipantMutation()
   const handleCreateEvent = async (data: FormValue) => {
      try {
         const response = await addParticipant(data).unwrap()
         form.reset()
         props.onOpenStateChange(!props.openState)
         toast.success(response?.message)
      } catch (error) {
         toast.error('Thêm cộng tác viên thất bại')
      }
   }

   return (
      <Dialog open={props.openState} onOpenChange={props.onOpenStateChange}>
         <DialogContent>
            <Box className='max-h-[80vh] overflow-y-auto scrollbar-none'>
               <DialogHeader className='text-left'>Thêm mới</DialogHeader>
               <DialogDescription>Nhập các thông tin dưới đây để invite thêm cộng tác viên</DialogDescription>
               <ErrorBoundary>
                  <Form {...form}>
                     <DialogForm onSubmit={form.handleSubmit(handleCreateEvent)} encType='multipart/form-data'>
                        <InputFieldControl name='name' control={form.control} label='Họ tên' />
                        <InputFieldControl name='email' control={form.control} label='Email' />
                        <InputFieldControl name='password' control={form.control} label='Mật khẩu' type='password' />
                        <InputFieldControl name='phone' control={form.control} label='Số điện thoại' />
                        <SelectFieldControl
                           name='role'
                           control={form.control}
                           options={Array.from(UserRoleValues, ([value, label]) => ({ value: value.toString(), label }))}
                           label='Vai trò'
                           placeholder='Vai trò'
                        />

                        <DialogFooter className='mt-6 flex flex-row items-center justify-end space-x-2'>
                           <Button type='button' variant='outline' onClick={() => props.onOpenStateChange(!props.openState)}>
                              Hủy
                           </Button>
                           <Button type='submit' disabled={isLoading}>
                              Tạo mới
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

export default CreateFormModal

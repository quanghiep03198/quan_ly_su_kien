import { EventStatusValues } from '@/common/constants/constants'
import { UserType } from '@/common/types/entities'
import { createFormData } from '@/common/utils/formdata'
import ErrorBoundary from '@/components/exceptions/error-boundary'
import {
   Box,
   Button,
   DatePickerFieldControl,
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   Form,
   Input,
   InputFieldControl,
   ScrollArea,
   SelectFieldControl
} from '@/components/ui'
import { useCreateEventMutation } from '@/redux/apis/event.api'
import { useGetParticipantsQuery } from '@/redux/apis/participant.api'
import { useAppSelector } from '@/redux/hook'
import { EventSchema } from '@/schemas/event.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import { z } from 'zod'

type EditFormModalProps = {
   openState: boolean
   onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValue = z.infer<typeof EventSchema>

type HelderOptions = Array<Record<string, any>>

const CreateFormModal: React.FC<EditFormModalProps> = (props) => {
   const form = useForm<FormValue>({
      resolver: zodResolver(EventSchema)
   })

   const user = useAppSelector((state) => state.auth.user)
   const { data: participants } = useGetParticipantsQuery()
   const [createEvent, { isLoading }] = useCreateEventMutation()
   const fileInputRef = useRef<typeof Input.prototype>()
   const handleCreateEvent = async (data: FormValue) => {
      try {
         const formData = createFormData({ ...data, banner: data.banner[0] })
         const response = await createEvent(formData).unwrap()
         form.reset()
         props.onOpenStateChange(!props.openState)
         toast.success(response?.message)
      } catch (error) {
         // const errorResponse = error as ErrorResponse
         toast.error('Thêm sự kiện thất bại')
      }
   }

   const heldersList = useMemo<HelderOptions>(() => {
      const helders = participants?.metadata ?? []
      return helders.map((helder) => ({ value: helder?.id, label: helder?.name }))
   }, [participants])

   return (
      <Dialog open={props.openState} onOpenChange={props.onOpenStateChange}>
         <DialogContent>
            <Box className='max-h-[80vh] overflow-y-auto scrollbar-none'>
               <DialogHeader className='text-left'>Thêm mới</DialogHeader>
               <DialogDescription>Nhập các thông tin dưới đây để thêm mới sự kiện</DialogDescription>
               <ErrorBoundary>
                  <Form {...form}>
                     <DialogForm onSubmit={form.handleSubmit(handleCreateEvent)} encType='multipart/form-data'>
                        <InputFieldControl name='name' control={form.control} label='Tên sự kiện' />
                        <InputFieldControl name='location' control={form.control} label='Địa điểm tổ chức' />
                        <SelectFieldControl
                           name='user_id'
                           control={form.control}
                           options={heldersList}
                           label='Nguời tổ chức'
                           placeholder='Chọn người tổ chức'
                        />
                        <SelectFieldControl
                           name='status'
                           control={form.control}
                           options={Array.from(EventStatusValues, ([value, label]) => ({ value: value.toString(), label }))}
                           label='Trạng thái'
                           placeholder='Trạng thái'
                        />
                        <InputFieldControl name='contact' control={form.control} label='Số điện thoại liên hệ' />
                        <InputFieldControl
                           ref={fileInputRef}
                           name='banner'
                           className='text-start'
                           type='file'
                           accept='image/*'
                           control={form.control}
                           label='Banner'
                        />
                        <DatePickerFieldControl name='start_time' control={form.control} label='Ngày bắt đầu' />
                        <DatePickerFieldControl name='end_time' control={form.control} label='Ngày kết thúc' />
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

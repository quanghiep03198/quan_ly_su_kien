import { EventType } from '@/common/types/entities'
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, Form, InputFieldControl } from '@/components/ui'
import { DatePickerFieldControl } from '@/components/ui/@hook-form/date-picker-control'
import { useUpdateEventMutation } from '@/redux/apis/event.api'
import { EventSchema } from '@/schemas/event.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import { z } from 'zod'

type EditFormModalProps = {
   defaultValue: Partial<EventType>
   openState: boolean
   onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValue = z.infer<typeof EventSchema>

const UpdateFormModal: React.FC<EditFormModalProps> = (props) => {
   const form = useForm<FormValue>({
      resolver: zodResolver(EventSchema),
      defaultValues: props.defaultValue
   })

   const [updateEvent, { isLoading }] = useUpdateEventMutation()

   useEffect(() => {
      form.reset(props.defaultValue)
   }, [props.defaultValue])

   const handleUpdateEvent = async (data: FormValue) => {
      try {
         console.log(data)
         const response = await updateEvent({ id: props.defaultValue.id, payload: data }).unwrap()
         toast.success(response.message)
      } catch (error) {
         const errorResponse = error as ErrorResponse
         toast.error(errorResponse.data.message)
      } finally {
         form.reset()
         props.onOpenStateChange(!props.openState)
      }
   }

   return (
      <Dialog open={props.openState} onOpenChange={props.onOpenStateChange}>
         <DialogContent>
            <DialogHeader className='text-left'>Cập nhật</DialogHeader>
            <DialogDescription>Thay các thông tin dưới đây để cập nhật thông tin sự kiện</DialogDescription>
            <Form {...form}>
               <DialogForm onSubmit={form.handleSubmit(handleUpdateEvent)}>
                  <InputFieldControl name='name' control={form.control} label='Tên sự kiện' />
                  <InputFieldControl name='location' control={form.control} label='Địa điểm tổ chức' />
                  <InputFieldControl name='contact' control={form.control} label='Số điện thoại liên hệ' />
                  <DatePickerFieldControl name='start_time' control={form.control} label='Ngày bắt đầu' />
                  <DatePickerFieldControl name='end_time' control={form.control} label='Ngày kết thúc' />
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
         </DialogContent>
      </Dialog>
   )
}

const DialogForm = tw.form`flex flex-col gap-4 py-4`

export default UpdateFormModal

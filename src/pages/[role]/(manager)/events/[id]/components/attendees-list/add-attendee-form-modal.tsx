import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Form, Icon, InputFieldControl } from '@/components/ui'

import { useAddAttendanceMutation } from '@/redux/apis/attendance.api'
import { AddUserSchema } from '@/schemas/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import { z } from 'zod'

type AddAttendeeFormModalProps = {
   open: boolean
   onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
}

type FormValue = z.infer<typeof AddUserSchema>

const AddAttendeeFormModal: React.FC<AddAttendeeFormModalProps> = (props) => {
   const form = useForm<FormValue>({ resolver: zodResolver(AddUserSchema) })
   const { id } = useParams()
   const [addAttendee, { isLoading }] = useAddAttendanceMutation()

   const handleAddAttendee = async (data: Required<FormValue>) => {
      try {
         await addAttendee({ ...data, event_id: id! }).unwrap()
         toast.success('Add sinh viên tham gia thành công')
      } catch (error) {
         const errorResponse = error as ErrorResponse
         toast.error(errorResponse.data.message)
      }
   }

   return (
      <Dialog {...props}>
         <DialogContent>
            <DialogHeader className='text-left'>
               <DialogTitle>Thêm người tham gia</DialogTitle>
               <DialogDescription>Nhập các thông tin phía dưới để thêm sinh viên tham gia</DialogDescription>
            </DialogHeader>
            <Form {...form}>
               <DialogForm onSubmit={form.handleSubmit(handleAddAttendee)}>
                  {/* <InputFieldControl type='text' name='event_id' control={form.control} value={id!} /> */}
                  <InputFieldControl
                     name='email'
                     type='email'
                     control={form.control}
                     label='Email'
                     description='Email này là email của sinh viên bạn muốn mời tham gia'
                  />
                  <Button type='submit' className='gap-x-2'>
                     {isLoading ? <Icon name='ArrowUpCircle' className='animate-spin' /> : <Icon name='PlusCircle' />} Thêm
                  </Button>
               </DialogForm>
            </Form>
         </DialogContent>
      </Dialog>
   )
}

const DialogForm = tw.form`flex flex-col items-stretch gap-y-6`

export default AddAttendeeFormModal

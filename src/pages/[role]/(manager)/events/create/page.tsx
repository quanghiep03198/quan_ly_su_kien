import { UserType } from '@/common/types/entities'
import { Cloudinary } from '@/services/cloudinary.service'
import { createFormData } from '@/common/utils/formdata'
import {
   Box,
   Button,
   DatePickerFieldControl,
   Form,
   Icon,
   InputFieldControl,
   Label,
   SelectFieldControl,
   TextareaFieldControl,
   Typography,
   Editor,
   FormMessage
} from '@/components/ui'
import { useCreateEventMutation } from '@/redux/apis/event.api'
import { useGetUsersQuery } from '@/redux/apis/user.api'
import { CreateEventSchema } from '@/schemas/event.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type FormValue = z.infer<typeof CreateEventSchema>
type HelderOptions = Array<Record<string, any>>

const CreateEvent = () => {
   const form = useForm<FormValue>({ resolver: zodResolver(CreateEventSchema) })
   const { data: users } = useGetUsersQuery({ pagination: false })
   const [createEvent] = useCreateEventMutation()
   const [editorState, setEditorState] = useState<{ value: string; isEmpty: boolean }>({ value: '', isEmpty: true })

   useEffect(() => {
      if (editorState.isEmpty && form.formState.isSubmitted) {
         form.setError('content', { type: 'required', message: 'Vui lòng nhập nội dung' })
      } else {
         form.clearErrors('content')
      }
      if (form.formState.isSubmitting) form.setValue('content', editorState.value)
   }, [editorState, form.formState.isSubmitting])

   const heldersList = useMemo<HelderOptions>(() => {
      const helders = (users as Array<UserType>) ?? []
      return helders.map((helder) => ({ value: helder?.id, label: helder?.name }))
   }, [users])

   const handleCreateEvent = async (data: FormValue) => {
      if (form.formState.errors.content) {
         form.setError('content', { type: 'required', message: 'Vui lòng nhập nội dung' })
         return
      }
      const banner = await Cloudinary.upload(data.banner?.[0])
      const formData = createFormData({
         ...data,
         banner,
         content: editorState.value,
         start_time: format(data.start_time, 'yyyy/MM/dd HH:mm:ss'),
         end_time: format(data.end_time, 'yyyy/MM/dd HH:mm:ss')
      })
      toast.promise(createEvent(formData).unwrap(), {
         loading: 'Đang tạo sự kiện ...',
         success: 'Sự kiện đã được tạo thành công',
         error: 'Tạo sự kiện thất bại'
      })
   }

   return (
      <Form {...form}>
         <form className='flex max-w-5xl flex-col gap-y-14' onSubmit={form.handleSubmit(handleCreateEvent)}>
            <Box className='flex items-center justify-between border-b py-4'>
               <Box className='space-y-2'>
                  <Typography variant='heading6'>Thêm sự kiện</Typography>
                  <p className='text-sm text-muted-foreground'>Nhập thông tin để đăng tải sự kiện</p>
               </Box>
               <Button type='submit' variant='default' size='sm' className='gap-x-2 sm:hidden md:hidden'>
                  <Icon name='CheckCircle' />
                  Lưu
               </Button>
            </Box>

            <Box className='flex flex-col items-stretch gap-10'>
               <Box className='grid grid-cols-6 gap-x-6 gap-y-10 sm:grid-cols-1'>
                  <Box className='col-span-3'>
                     <InputFieldControl name='name' control={form.control} label='Tên sự kiện' description='Tên sự kiện không quá 60 ký tự' />
                  </Box>
                  <Box className='col-span-3'>
                     <InputFieldControl name='location' control={form.control} label='Địa điểm tổ chức' />
                  </Box>
                  <Box className='col-span-3'>
                     <DatePickerFieldControl name='start_time' control={form.control} label='Ngày bắt đầu' />
                  </Box>
                  <Box className='col-span-3'>
                     <DatePickerFieldControl name='end_time' control={form.control} label='Ngày kết thúc' />
                  </Box>
                  <Box className='col-span-2'>
                     <InputFieldControl name='contact' control={form.control} label='Số điện thoại liên hệ' />
                  </Box>
                  <Box className='col-span-2'>
                     <InputFieldControl name='banner' control={form.control} type='file' label='Banner' />
                  </Box>
                  <Box className='col-span-2'>
                     <SelectFieldControl
                        className='col-span-2'
                        name='user_id'
                        control={form.control}
                        options={heldersList}
                        label='Nguời tổ chức'
                        placeholder='Chọn người tổ chức'
                     />
                  </Box>
                  <Box className='col-span-full'>
                     <TextareaFieldControl rows={5} resizable={true} name='description' control={form.control} label='Mô tả' />
                  </Box>
               </Box>
               <Box className='w-full max-w-5xl space-y-2'>
                  <Label>Nội dung</Label>
                  <Editor onUpdate={setEditorState} />
                  {form.getFieldState('content').error && <FormMessage>{form.getFieldState('content')?.error?.message}</FormMessage>}
               </Box>
               <Button type='submit' className='lg:hidden xl:hidden'>
                  Lưu
               </Button>
            </Box>
         </form>
      </Form>
   )
}

export default CreateEvent

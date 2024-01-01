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
   Typography
} from '@/components/ui'
import Editor from '@/components/ui/@tiptap'
import { useCreateEventMutation } from '@/redux/apis/event.api'
import { useGetParticipantsQuery } from '@/redux/apis/participant.api'
import { EventSchema } from '@/schemas/event.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type FormValue = z.infer<typeof EventSchema>
type HelderOptions = Array<Record<string, any>>

const CreateEvent = () => {
   const form = useForm<FormValue>({ resolver: zodResolver(EventSchema) })
   const { data: participants } = useGetParticipantsQuery({ page: 1, limit: 1000 })
   const [createEvent] = useCreateEventMutation()
   const [editorState, setEditorState] = useState<{ value: string; isEmpty: boolean }>({ value: '', isEmpty: true })

   const heldersList = useMemo<HelderOptions>(() => {
      const helders = participants?.docs ?? []
      return helders.map((helder) => ({ value: helder?.id, label: helder?.name }))
   }, [participants])

   const handleCreateEvent = async (data: FormValue) => {
      if (editorState.isEmpty) {
         toast.error('Vui lòng nhập nội dung')
         return
      }

      const formData = createFormData({
         ...data,
         content: editorState.value,
         start_time: format(data.start_time, 'yyyy/MM/dd HH:mm:ss'),
         end_time: format(data.end_time, 'yyyy/MM/dd HH:mm:ss'),
         banner: data.banner?.[0]
      })
      toast.promise(createEvent(formData), {
         loading: 'Đang tạo sự kiện ...',
         success: 'Sự kiện đã được tạo thành công',
         error: 'Tạo sự kiện thất bại'
      })
   }

   return (
      <Form {...form}>
         <form className='flex flex-col gap-y-14' onSubmit={form.handleSubmit(handleCreateEvent)}>
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
               <Box className='grid max-w-5xl grid-cols-6 gap-x-6 gap-y-10 sm:grid-cols-1'>
                  <Box className='col-span-3'>
                     <InputFieldControl name='name' control={form.control} label='Tên sự kiện' />
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
                     />{' '}
                  </Box>

                  <Box className='col-span-full'>
                     <TextareaFieldControl rows={5} resizable={true} name='description' control={form.control} label='Mô tả' />
                  </Box>
               </Box>
               <Box className='w-full max-w-5xl space-y-2'>
                  <Label>Nội dung</Label>
                  <Editor onEditorStateChange={setEditorState} />
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

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
import { useGetEventDetailsQuery, useUpdateEventMutation } from '@/redux/apis/event.api'
import { useGetParticipantsQuery } from '@/redux/apis/participant.api'
import { EventSchema } from '@/schemas/event.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

type FormValue = z.infer<typeof EventSchema>
type HelderOptions = Array<Record<string, any>>

const UpdateEvent = () => {
   const { id } = useParams()
   const { data } = useGetEventDetailsQuery(id!, { refetchOnMountOrArgChange: true })
   const { data: participants } = useGetParticipantsQuery({ page: 1, limit: 1000 })
   const [editorState, setEditorState] = useState<{ value: string; isEmpty: boolean }>({ value: '', isEmpty: true })
   const form = useForm<FormValue>({
      resolver: zodResolver(EventSchema)
   })
   const [updateEvent] = useUpdateEventMutation()

   useEffect(() => {
      if (data) {
         const { name, location, contact, user_id, description, content, start_time, end_time } = data
         form.reset({
            name,
            location,
            contact,
            user_id,
            description,
            content,
            start_time: new Date(start_time!),
            end_time: new Date(end_time!)
         } as FormValue)
      }
   }, [data])

   const heldersList = useMemo<HelderOptions>(() => {
      const helders = participants?.docs ?? []
      return helders.map((helder) => ({ value: helder?.id, label: helder?.name }))
   }, [participants])

   const handleUpdateEvent = async (data: FormValue) => {
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
      toast.promise(updateEvent({ id: id, payload: formData }), {
         loading: 'Đang cập nhật sự kiện ...',
         success: 'Sự kiện đã được cập nhật thành công',
         error: 'Cập nhật sự kiện thất bại'
      })
   }

   return (
      <Form {...form}>
         <form className='flex flex-col gap-y-14' encType='multipart/form-data' onSubmit={form.handleSubmit(handleUpdateEvent)}>
            <Box className='flex items-center justify-between border-b py-4'>
               <Box className='space-y-2'>
                  <Typography variant='heading6'>Cập nhật sự kiện</Typography>
                  <p className='text-sm text-muted-foreground'>Nhập thông tin để cập nhật sự kiện</p>
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
                     />
                  </Box>
                  <Box className='col-span-full'>
                     <TextareaFieldControl rows={5} resizable={true} name='description' control={form.control} label='Mô tả' />
                  </Box>
               </Box>
               <Box className='w-full max-w-5xl'>
                  <Label htmlFor='editor'>Nội dung</Label>
                  <Editor id='editor' onEditorStateChange={setEditorState} />
               </Box>
               <Button type='submit' className='lg:hidden xl:hidden'>
                  Lưu
               </Button>
            </Box>
         </form>
      </Form>
   )
}

export default UpdateEvent

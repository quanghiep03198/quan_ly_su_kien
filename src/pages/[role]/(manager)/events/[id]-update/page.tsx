import { UserRoleEnum } from '@/common/constants/enums'
import { UserType } from '@/common/types/entities'
import { Cloudinary } from '@/services/cloudinary.service'
import {
   Box,
   Button,
   DatePickerFieldControl,
   Editor,
   Form,
   FormItem,
   FormMessage,
   Icon,
   InputFieldControl,
   Label,
   SelectFieldControl,
   TextareaFieldControl,
   Typography
} from '@/components/ui'
import { useGetEventDetailsQuery, useUpdateEventMutation } from '@/redux/apis/event.api'
import { useGetUsersQuery } from '@/redux/apis/user.api'
import { CreateEventSchema, UpdateEventSchema } from '@/schemas/event.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

type FormValue = z.infer<typeof CreateEventSchema>
type HelderOptions = Array<Record<string, any>>

const UpdateEvent = () => {
   const { id } = useParams()
   const { data } = useGetEventDetailsQuery(id!, { refetchOnMountOrArgChange: true })
   const { data: users } = useGetUsersQuery({ pagination: false, role: UserRoleEnum.STAFF })
   const [editorState, setEditorState] = useState<{ value: string; isEmpty: boolean }>({ value: '', isEmpty: true })
   const form = useForm<FormValue>({
      resolver: zodResolver(UpdateEventSchema)
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
      const helders = (users as Array<UserType>) ?? []
      return helders.map((helder) => ({ value: helder?.id, label: helder?.name }))
   }, [users])

   useEffect(() => {
      if (editorState.isEmpty) {
         form.setError('content', { type: 'required', message: 'Vui lòng nhập nội dung' })
      } else {
         form.clearErrors('content')
      }
   }, [editorState, form.formState.isSubmitting])

   const handleUpdateEvent = async (payload: FormValue) => {
      if (form.formState.errors.content) {
         form.setError('content', { type: 'required', message: 'Vui lòng nhập nội dung' })
         return
      }

      if (payload.banner) payload.banner = await Cloudinary.upload(payload.banner?.[0])
      console.log('data', payload)
      toast.promise(
         updateEvent({
            id: id,
            payload: {
               ...payload,
               content: editorState.value,
               status: 1,
               banner: data?.banner,
               start_time: format(payload.start_time, 'yyyy/MM/dd HH:mm:ss'),
               end_time: format(payload.end_time, 'yyyy/MM/dd HH:mm:ss')
            }
         }).unwrap(),
         {
            loading: 'Đang cập nhật sự kiện ...',
            success: 'Sự kiện đã được cập nhật thành công',
            error: 'Cập nhật sự kiện thất bại'
         }
      )
   }

   return (
      <Form {...form}>
         <form className='flex max-w-5xl flex-col gap-y-14' onSubmit={form.handleSubmit(handleUpdateEvent)}>
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
               <Box className='grid grid-cols-6 gap-x-6 gap-y-10 sm:grid-cols-1'>
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
                     <SelectFieldControl
                        className='col-span-2'
                        name='user_id'
                        control={form.control}
                        options={heldersList}
                        label='Nguời tổ chức'
                        placeholder='Chọn người tổ chức'
                     />
                  </Box>
                  <Box className='col-span-2'>
                     <InputFieldControl name='contact' control={form.control} label='Số điện thoại liên hệ' />
                  </Box>
                  <Box className='col-span-2'>
                     <InputFieldControl name='banner' control={form.control} type='file' label='Banner' />
                  </Box>

                  <Box className='col-span-full'>
                     <TextareaFieldControl rows={5} resizable={true} name='description' control={form.control} label='Mô tả' />
                  </Box>
               </Box>
               <Box className='w-full max-w-5xl'>
                  <FormItem>
                     <Label htmlFor='editor'>Nội dung</Label>
                     <Editor id='editor' content={form.getValues('content')} onUpdate={setEditorState} />
                     {form.getFieldState('content').error && <FormMessage>{form.getFieldState('content')?.error?.message}</FormMessage>}
                  </FormItem>
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

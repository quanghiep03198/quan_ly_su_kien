import { Box, Button, Form, InputFieldControl, SelectFieldControl, TextareaFieldControl, Typography } from '@/components/ui'
import Editor from '@/components/ui/@tiptap'
import { useGetParticipantsQuery } from '@/redux/apis/participant.api'
import { EventSchema } from '@/schemas/event.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormValue = z.infer<typeof EventSchema>
type HelderOptions = Array<Record<string, any>>
const CreateEvent = () => {
   const form = useForm<FormValue>({ resolver: zodResolver(EventSchema) })
   const { data: participants } = useGetParticipantsQuery({ page: 1, limit: 1000 })
   const heldersList = useMemo<HelderOptions>(() => {
      const helders = participants?.docs ?? []
      return helders.map((helder) => ({ value: helder?.id, label: helder?.name }))
   }, [participants])

   return (
      <Form {...form}>
         <form action='' className='flex flex-col gap-y-12'>
            <Box className='flex items-center justify-between'>
               <Typography variant='heading6'>Thêm sự kiện</Typography>
            </Box>

            <Box className='grid grid-cols-[1fr_1.5fr] items-stretch gap-10 sm:grid-cols-1 md:grid-cols-1'>
               <Box className='flex flex-col gap-y-6'>
                  <InputFieldControl name='name' control={form.control} label='Tên sự kiện' />
                  <SelectFieldControl name='user_id' control={form.control} options={heldersList} label='Nguời tổ chức' placeholder='Chọn người tổ chức' />
                  <InputFieldControl name='banner' control={form.control} type='file' label='Banner' />
                  <TextareaFieldControl rows={5} resizable={true} name='description' control={form.control} label='Mô tả' />
                  <Button type='submit' className='sm:hidden md:hidden'>
                     Lưu
                  </Button>
               </Box>

               <Editor />
               <Button type='submit' className='lg:hidden xl:hidden'>
                  Lưu
               </Button>
            </Box>
         </form>
      </Form>
   )
}

export default CreateEvent

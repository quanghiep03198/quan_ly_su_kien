import { cn } from '@/common/utils/cn'
import { Box, Button, Editor, Form, FormItem, FormMessage, Icon, InputFieldControl, Label, Typography, buttonVariants } from '@/components/ui'
import { NotificationSchema } from '@/schemas/notification.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type FormValue = z.infer<typeof NotificationSchema>

const NotificationSetting: React.FunctionComponent = () => {
   const form = useForm<FormValue>({ resolver: zodResolver(NotificationSchema) })
   const [editorState, setEditorState] = useState<{ isEmpty: boolean; value: string }>({ isEmpty: true, value: '' })
   const id = useId()

   useEffect(() => {
      if (form.formState.isSubmitted && editorState.isEmpty) form.setError('content', { message: 'Vui lòng nhập nội dung' })
      else form.clearErrors('content')
   }, [editorState])

   return (
      <Box className='flex max-w-5xl flex-col items-stretch gap-y-12'>
         <Box className='flex items-start justify-between border-b pb-4 sm:border-none'>
            <Box className='space-y-2'>
               <Typography variant='heading6'>Cài đặt thông báo</Typography>
               <small className='text-muted-foreground'>Nhập thông tin phía dưới để tạo thông báo</small>
            </Box>
            <Label htmlFor={id} className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'gap-x-2 sm:hidden')}>
               <Icon name='BellPlus' /> Tạo thông báo
            </Label>
         </Box>
         <Form {...form}>
            <form action='' className='flex flex-col items-stretch gap-y-6'>
               <InputFieldControl name='title' control={form.control} label='Tiêu đề' placeholder='Tiêu đề ...' />
               <FormItem>
                  <Label>Nội dung</Label>
                  <Editor onUpdate={setEditorState} />
                  {form.getFieldState('content').error && <FormMessage>{form.getFieldState('content').error?.message}</FormMessage>}
               </FormItem>
               <Button id={id} type='submit' className='hidden gap-x-2 sm:inline-flex'>
                  <Icon name='BellPlus' /> Tạo thông báo
               </Button>
            </form>
         </Form>
      </Box>
   )
}

export default NotificationSetting

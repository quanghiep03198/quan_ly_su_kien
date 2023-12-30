import { Editor } from '@tiptap/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import tw from 'tailwind-styled-components'
import { Box, Button, Form, Icon, InputFieldControl, Label, Popover, PopoverContent, PopoverTrigger, Typography } from '../../..'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const UrlSchema = z.object({ url: z.string().url({ message: 'URL không hợp lệ' }).optional() })

export const LinkPopover: React.FC<{ editor: Editor }> = ({ editor }) => {
   const form = useForm<z.infer<typeof UrlSchema>>({
      resolver: zodResolver(UrlSchema)
   })

   const handleInsertLink = ({ url }: z.infer<typeof UrlSchema>) => {
      if (!url) return
      // empty
      if (url === '') {
         editor.chain().focus().extendMarkRange('link').unsetLink().run()
         return
      }
      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
   }

   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant='outline' size='icon' className='aspect-square h-8 w-8'>
               <Icon name='Link' />
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-80'>
            <Box className='grid gap-4'>
               <Box className='space-y-2'>
                  <Typography className='font-medium leading-none'>Chèn link</Typography>
                  <p className='text-sm text-muted-foreground'>Chèn 1 đường liên kết vào văn bản đã chọn</p>
               </Box>
               <Form {...form}>
                  <form className='flex items-center gap-x-3' onSubmit={form.handleSubmit(handleInsertLink)}>
                     <InputFieldControl placeholder='Dán 1 đường liên kết' control={form.control} name='url' className='col-span-2 h-8' />
                     <Button variant='default'>Áp dụng</Button>
                  </form>
               </Form>
            </Box>
         </PopoverContent>
      </Popover>
   )
}

const StyledForm = tw.form`grid gap-2`

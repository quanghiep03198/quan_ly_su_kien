import {
   Box,
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
   FormItem,
   Icon,
   Input,
   Label
} from '@/components/ui'
import Tooltip from '@/components/ui/@override/tooltip'
import { Editor } from '@tiptap/react'
import React, { useState } from 'react'
import tw from 'tailwind-styled-components'

const TableDropdownMenu: React.FC<{ editor: Editor }> = ({ editor }) => {
   const [rows, setRows] = useState<number>(2)
   const [cols, setCols] = useState<number>(2)

   const handleInsertTable = () => {
      editor.chain().focus().insertTable({ cols, rows }).run()
   }

   const handleValueChange = (value: number, callback: React.Dispatch<React.SetStateAction<number>>) => {
      if (!value || value < 1) {
         callback(1)
         return
      }
      callback(value)
   }

   return (
      <DropdownMenu>
         <Tooltip content='Bảng'>
            <DropdownMenuTrigger asChild>
               <Button size='icon' className='h-8 w-8' variant='outline'>
                  <Icon name='Table' strokeWidth={2} />
               </Button>
            </DropdownMenuTrigger>
         </Tooltip>
         <DropdownMenuContent>
            <DropdownMenuLabel>Bảng</DropdownMenuLabel>
            <DropdownMenuSub>
               <DropdownMenuSubTrigger>Chèn bảng</DropdownMenuSubTrigger>
               <DropdownMenuPortal>
                  <DropdownMenuSubContent className='p-4'>
                     <Box className='grid gap-4'>
                        <Box className='space-y-2'>
                           <h4 className='text-base font-medium leading-none'>Tùy chọn bảng</h4>
                           <p className='text-sm text-muted-foreground'>Chọn số số cột và hàng để tạo bảng</p>
                        </Box>
                        <FormItem className='flex flex-row items-center gap-x-2'>
                           <Label htmlFor='rows' className='basis-1/2 text-sm'>
                              Số hàng
                           </Label>
                           <Input
                              id='rows'
                              type='number'
                              className='h-8 text-sm'
                              placeholder='Số hàng'
                              value={rows}
                              onChange={(e) => handleValueChange(+e.target.value, setRows)}
                           />
                        </FormItem>
                        <FormItem className='flex flex-row items-center gap-x-2'>
                           <Label htmlFor='cols' className='basis-1/2 text-sm'>
                              Số cột
                           </Label>
                           <Input
                              id='cols'
                              type='number'
                              className='h-8 text-sm'
                              placeholder='Số cột'
                              value={cols}
                              onChange={(e) => handleValueChange(+e.target.value, setCols)}
                           />
                        </FormItem>
                        <Button type='button' size='sm' className='gap-x-2' onClick={handleInsertTable}>
                           <Icon name='PlusCircle' /> Chèn bảng
                        </Button>
                     </Box>
                  </DropdownMenuSubContent>
               </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <StyledDropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                  <Icon name='Plus' />
                  Chèn 1 hàng bên dưới
               </StyledDropdownMenuItem>
               <StyledDropdownMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                  <Icon name='Plus' />
                  Chèn 1 hàng bên trên
               </StyledDropdownMenuItem>
               <StyledDropdownMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
                  <Icon name='Plus' />
                  Chèn 1 cột bên trái
               </StyledDropdownMenuItem>
               <StyledDropdownMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                  <Icon name='Plus' />
                  Chèn 1 cột bên phải
               </StyledDropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <StyledDropdownMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
                  <Icon name='Trash2' />
                  Xóa hàng
               </StyledDropdownMenuItem>
               <StyledDropdownMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
                  <Icon name='Trash2' />
                  Xóa cột
               </StyledDropdownMenuItem>
               <StyledDropdownMenuItem onClick={() => editor.chain().focus().deleteTable().run()}>
                  <Icon name='Trash2' />
                  Xóa bảng
               </StyledDropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

const StyledDropdownMenuItem = tw(DropdownMenuItem)`gap-x-2`

export default TableDropdownMenu

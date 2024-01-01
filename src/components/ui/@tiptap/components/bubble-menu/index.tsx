import { Box, Button, Icon } from '@/components/ui'
import { Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'

const BubbleMenu: React.FC<{ editor: Editor }> = ({ editor }) => {
   if (!editor.isActive('link')) return

   return (
      <TiptapBubbleMenu editor={editor} className=''>
         <Box className='flex flex-col gap-4 rounded-lg bg-background p-2 shadow'>
            <a
               href={editor.getAttributes('link').href}
               target='_blank'
               className='line-clamp-1 inline-flex max-w-[10rem] items-center gap-x-3 whitespace-nowrap text-xs'
            >
               <Icon name='Globe' /> {editor.getAttributes('link').href}
            </a>
            <Box className='flex items-center gap-x-2'>
               <Button type='button' className='aspect-square h-8 w-8' variant='ghost' size='icon'>
                  <Icon name='Pencil' />
               </Button>
               <Button type='button' className='aspect-square h-8 w-8' variant='ghost' size='icon'>
                  <Icon name='ClipboardCopy' />
               </Button>
               <Button type='button' className='aspect-square h-8 w-8' variant='ghost' size='icon'>
                  <Icon name='Unlink' />
               </Button>
            </Box>
         </Box>
      </TiptapBubbleMenu>
   )
}

export default BubbleMenu

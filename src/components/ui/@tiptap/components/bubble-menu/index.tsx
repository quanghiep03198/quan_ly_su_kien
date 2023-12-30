import { Box, Button, Icon } from '@/components/ui'
import { Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react'

const BubbleMenu: React.FC<{ editor: Editor }> = ({ editor }) => {
   if (!editor.isActive('link')) return

   return (
      <TiptapBubbleMenu editor={editor}>
         <a href={editor.getAttributes('link').href} target='_blank' className='inline-flex items-center gap-x-3'>
            <Icon name='Globe' /> {editor.getAttributes('link').href}
         </a>
         <Box className='flex items-center gap-x-2'>
            <Button className='aspect-square h-8 w-8' variant='ghost' size='icon'>
               <Icon name='Pencil' />
            </Button>
            <Button className='aspect-square h-8 w-8' variant='ghost' size='icon'>
               <Icon name='ClipboardCopy' />
            </Button>
            <Button className='aspect-square h-8 w-8' variant='ghost' size='icon'>
               <Icon name='Unlink' />
            </Button>
         </Box>
      </TiptapBubbleMenu>
   )
}

export default BubbleMenu

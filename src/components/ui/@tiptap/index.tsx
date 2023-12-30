import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import { Box } from '..'
import Toolbar from './components/toolbar'
import { extensions } from './extensions'

type EditorProps = {
   onChange?: (value: string) => void
   defaultValue?: string
   disabled?: boolean
}

const Editor: React.FC<EditorProps> = ({ defaultValue, disabled, onChange }) => {
   const editor = useEditor({
      content: defaultValue,
      extensions,
      editorProps: {
         attributes: {
            class: 'p-4 rounded-lg max-w-full overflow-auto border-none outline-none focus:outline-none focus:border-none min-h-[50vh] text-foreground bg-background prose prose-li:p-0'
         }
      },
      editable: !Boolean(disabled),
      onUpdate: ({ editor }) => {
         if (onChange) onChange(editor.getHTML())
      }
   })

   if (!editor) {
      return null
   }

   return (
      <Box className='flex w-full max-w-full flex-col items-stretch divide-y divide-border rounded-lg border shadow'>
         <Toolbar editor={editor} />
         <EditorContent editor={editor} />
         {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu> */}
      </Box>
   )
}

Editor.defaultProps = {
   defaultValue: '',
   disabled: false
}

export default Editor

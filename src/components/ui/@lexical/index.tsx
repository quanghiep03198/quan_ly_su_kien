import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import ToolbarPlugin from './plugins/toolbar.plugin'
import theme from './theme'
import { Box, Typography } from '..'

function onError(error: Error) {
   console.error(error)
}

export default function Editor() {
   const initialConfig = {
      namespace: 'MyEditor',
      editable: true,
      theme: theme,
      onError,
      nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, CodeHighlightNode, TableNode, TableCellNode, TableRowNode, AutoLinkNode, LinkNode]
   }

   return (
      <LexicalComposer initialConfig={initialConfig}>
         <ToolbarPlugin />
         <Box className='relative'>
            <PlainTextPlugin
               contentEditable={<ContentEditable className='relative min-h-[50vh] rounded-lg border p-4 py-20 focus:border-primary focus:outline-none' />}
               placeholder={<Typography className='absolute left-6 top-20 font-normal text-muted-foreground'>Enter some text ...</Typography>}
               ErrorBoundary={LexicalErrorBoundary}
            />
         </Box>
         <HistoryPlugin />

         {/* <MyCustomAutoFocusPlugin /> */}
      </LexicalComposer>
   )
}

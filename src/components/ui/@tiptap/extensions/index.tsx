import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { FontSize } from './font-size.extension'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

export const extensions = [
   StarterKit.configure({
      heading: {
         levels: [1, 2, 3],
         HTMLAttributes: { class: 'font-bold text-foreground' }
      },
      bold: {
         HTMLAttributes: {
            class: 'font-bold text-foreground'
         }
      },
      paragraph: {
         HTMLAttributes: {
            class: 'my-1'
         }
      },
      blockquote: {
         HTMLAttributes: { class: 'text-foreground border-none p-0' }
      },
      bulletList: {
         HTMLAttributes: {
            class: 'list-disc text-foreground'
         }
      },
      orderedList: {
         HTMLAttributes: {
            class: 'list-decimal text-foreground'
         }
      }
   }),
   Placeholder.configure({
      placeholder: 'Nhập gì đó ...'
   }),
   Underline.configure(),
   TextAlign.configure({
      types: ['heading', 'paragraph']
   }),
   Table.configure({
      resizable: true
   }),
   TableRow.configure(),
   TableHeader.configure(),
   TableCell.configure(),
   Highlight.configure({ multicolor: true }),
   Link.configure({
      openOnClick: false,
      HTMLAttributes: {
         class: 'text-sky-400 font-normal'
      }
   }),
   FontSize.configure(),
   TextStyle.configure(),
   Color.configure(),
   Image.configure({
      HTMLAttributes: {
         class: 'object-center object-cover max-w-full aspect-[16/9]'
      },
      allowBase64: true
   }).extend({
      src: {
         default: null
      },
      alt: {
         default: null
      },
      title: {
         default: null
      },
      'data-base64': {
         default: null
      },
      'data-label': {
         default: null
      }
   })
]

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
   Underline.configure(),
   TextAlign.configure({
      types: ['heading', 'paragraph']
   }),
   Placeholder.configure({
      // Use a placeholder:
      // placeholder: 'Write something …'
      // Use different placeholders depending on the node type:
      placeholder: ({ node }) => {
         if (node.type.name === 'heading') {
            return 'Tiêu đề ...'
         }

         return 'Bắt đầu nhập ...'
      }
   }),
   Highlight.configure({ multicolor: true }),
   Link.configure({
      openOnClick: true,
      HTMLAttributes: {
         class: 'text-sky-400 font-normal'
      }
   }),
   FontSize.configure(),
   TextStyle.configure(),
   Color.configure(),
   Image.configure({
      // inline: false,
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

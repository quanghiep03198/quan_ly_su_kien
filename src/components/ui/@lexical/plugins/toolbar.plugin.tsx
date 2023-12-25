import { $createCodeNode, $isCodeNode, getCodeLanguages, getDefaultCodeLanguage } from '@lexical/code'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import { $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListNode, REMOVE_LIST_COMMAND } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, $createQuoteNode, $isHeadingNode } from '@lexical/rich-text'
import { $isAtNodeEnd, $isParentElementRTL, $wrapNodes } from '@lexical/selection'
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils'
import { FontBoldIcon, FontItalicIcon, UnderlineIcon } from '@radix-ui/react-icons'
import {
   $createParagraphNode,
   $getNodeByKey,
   $getSelection,
   $isRangeSelection,
   CAN_REDO_COMMAND,
   CAN_UNDO_COMMAND,
   FORMAT_ELEMENT_COMMAND,
   FORMAT_TEXT_COMMAND,
   REDO_COMMAND,
   SELECTION_CHANGE_COMMAND,
   UNDO_COMMAND
} from 'lexical'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
   Box,
   Button,
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuRadioGroup,
   DropdownMenuRadioItem,
   DropdownMenuTrigger,
   Icon,
   ToggleGroup,
   ToggleGroupItem
} from '../..'
import { IconProps } from '../../@shadcn/icon'

const LowPriority = 1

// const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol'])

const blockTypeToBlockName = {
   code: 'Code Block',
   h1: 'Large Heading',
   h2: 'Small Heading',
   h3: 'Heading',
   h4: 'Heading',
   h5: 'Heading',
   ol: 'Numbered List',
   paragraph: 'Normal',
   quote: 'Quote',
   ul: 'Bulleted List'
}

function Divider() {
   return <div className='divider' />
}

function positionEditorElement(editor, rect) {
   if (rect === null) {
      editor.style.opacity = '0'
      editor.style.top = '-1000px'
      editor.style.left = '-1000px'
   } else {
      editor.style.opacity = '1'
      editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`
      editor.style.left = `${rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2}px`
   }
}

function FloatingLinkEditor({ editor }) {
   const editorRef = useRef(null)
   const inputRef = useRef(null)
   const mouseDownRef = useRef(false)
   const [linkUrl, setLinkUrl] = useState('')
   const [isEditMode, setEditMode] = useState(false)
   const [lastSelection, setLastSelection] = useState(null)

   const updateLinkEditor = useCallback(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
         const node = getSelectedNode(selection)
         const parent = node.getParent()
         if ($isLinkNode(parent)) {
            setLinkUrl(parent.getURL())
         } else if ($isLinkNode(node)) {
            setLinkUrl(node.getURL())
         } else {
            setLinkUrl('')
         }
      }
      const editorElem = editorRef.current
      const nativeSelection = window.getSelection()
      const activeElement = document.activeElement

      if (editorElem === null) {
         return
      }

      const rootElement = editor.getRootElement()
      if (selection !== null && !nativeSelection.isCollapsed && rootElement !== null && rootElement.contains(nativeSelection.anchorNode)) {
         const domRange = nativeSelection.getRangeAt(0)
         let rect
         if (nativeSelection.anchorNode === rootElement) {
            let inner = rootElement
            while (inner.firstElementChild != null) {
               inner = inner.firstElementChild
            }
            rect = inner.getBoundingClientRect()
         } else {
            rect = domRange.getBoundingClientRect()
         }

         if (!mouseDownRef.current) {
            positionEditorElement(editorElem, rect)
         }
         setLastSelection(selection)
      } else if (!activeElement || activeElement.className !== 'link-input') {
         positionEditorElement(editorElem, null)
         setLastSelection(null)
         setEditMode(false)
         setLinkUrl('')
      }

      return true
   }, [editor])

   useEffect(() => {
      return mergeRegister(
         editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
               updateLinkEditor()
            })
         }),

         editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
               updateLinkEditor()
               return true
            },
            LowPriority
         )
      )
   }, [editor, updateLinkEditor])

   useEffect(() => {
      editor.getEditorState().read(() => {
         updateLinkEditor()
      })
   }, [editor, updateLinkEditor])

   useEffect(() => {
      if (isEditMode && inputRef.current) {
         inputRef.current.focus()
      }
   }, [isEditMode])

   return (
      <div ref={editorRef} className='link-editor'>
         {isEditMode ? (
            <input
               ref={inputRef}
               className='link-input'
               value={linkUrl}
               onChange={(event) => {
                  setLinkUrl(event.target.value)
               }}
               onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                     event.preventDefault()
                     if (lastSelection !== null) {
                        if (linkUrl !== '') {
                           editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
                        }
                        setEditMode(false)
                     }
                  } else if (event.key === 'Escape') {
                     event.preventDefault()
                     setEditMode(false)
                  }
               }}
            />
         ) : (
            <>
               <div className='link-input'>
                  <a href={linkUrl} target='_blank' rel='noopener noreferrer'>
                     {linkUrl}
                  </a>
                  <div
                     className='link-edit'
                     role='button'
                     tabIndex={0}
                     onMouseDown={(event) => event.preventDefault()}
                     onClick={() => {
                        setEditMode(true)
                     }}
                  />
               </div>
            </>
         )}
      </div>
   )
}

function CustomSelect({ onChange, className, options, value }) {
   return (
      <select className={className} onChange={onChange} value={value}>
         <option hidden={true} value='' />
         {options.map((option) => (
            <option key={option} value={option}>
               {option}
            </option>
         ))}
      </select>
   )
}

function getSelectedNode(selection: any) {
   const anchor = selection.anchor
   const focus = selection.focus
   const anchorNode = selection.anchor.getNode()
   const focusNode = selection.focus.getNode()
   if (anchorNode === focusNode) {
      return anchorNode
   }
   const isBackward = selection.isBackward()
   if (isBackward) {
      return $isAtNodeEnd(focus) ? anchorNode : focusNode
   } else {
      return $isAtNodeEnd(anchor) ? focusNode : anchorNode
   }
}

function BlockOptionsDropdownList({ editor, blockType }) {
   const dropDownRef = useRef(null)
   const [blockOption, setBlockOption] = useState(blockTypeToBlockName.paragraph)

   const formatParagraph = () => {
      if (blockType !== 'paragraph') {
         editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
               $wrapNodes(selection, () => $createParagraphNode())
            }
         })
      }
   }

   const formatLargeHeading = () => {
      if (blockType !== 'h1') {
         console.log('format heading 1')
         editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
               $wrapNodes(selection, () => $createHeadingNode('h1'))
            }
         })
      }
   }

   const formatSmallHeading = () => {
      if (blockType !== 'h2') {
         editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
               $wrapNodes(selection, () => $createHeadingNode('h2'))
            }
         })
      }
   }

   const formatBulletList = () => {
      console.log('Format list')
      if (blockType !== 'ul') {
         editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)
      } else {
         editor.dispatchCommand(REMOVE_LIST_COMMAND)
      }
   }

   const formatNumberedList = () => {
      if (blockType !== 'ol') {
         editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)
      } else {
         editor.dispatchCommand(REMOVE_LIST_COMMAND)
      }
   }

   const formatQuote = () => {
      if (blockType !== 'quote') {
         editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
               $wrapNodes(selection, () => $createQuoteNode())
            }
         })
      }
   }

   const formatCode = () => {
      if (blockType !== 'code') {
         editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
               $wrapNodes(selection, () => $createCodeNode())
            }
         })
      }
   }

   useEffect(() => {
      switch (blockOption) {
         case blockTypeToBlockName.paragraph:
            formatParagraph()
            break
         case blockTypeToBlockName.h1:
            formatLargeHeading()
            break
         case blockTypeToBlockName.h2:
            formatSmallHeading()
            break
         case blockTypeToBlockName.ol:
            formatNumberedList()
            break
         case blockTypeToBlockName.ul:
            formatBulletList()
            break
         case blockTypeToBlockName.quote:
            formatQuote()
            break
         case blockTypeToBlockName.code:
            formatCode()
            break

         default:
            break
      }
   }, [blockOption, editor])

   const blockOptions: Array<{ value: string; icon: IconProps['name'] }> = [
      {
         value: 'Large Heading',
         icon: 'Heading1'
      },
      {
         value: 'Small Heading',
         icon: 'Heading2'
      },
      {
         value: 'Normal',
         icon: 'Text'
      },
      {
         value: 'Numbered List',
         icon: 'ListOrdered'
      },
      {
         value: 'Bulleted List',
         icon: 'List'
      }
   ]
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm'>
               {blockOption}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className='w-56'>
            <DropdownMenuRadioGroup value={blockOption} onValueChange={setBlockOption}>
               {blockOptions.map((item) => (
                  <DropdownMenuRadioItem key={item.value} value={item.value} className='gap-x-2'>
                     <Icon name={item.icon} />
                     {item.value}
                  </DropdownMenuRadioItem>
               ))}
            </DropdownMenuRadioGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default function ToolbarPlugin() {
   const [editor] = useLexicalComposerContext()
   const toolbarRef = useRef<HTMLDivElement>(null)
   const [canUndo, setCanUndo] = useState(false)
   const [canRedo, setCanRedo] = useState(false)
   const [blockType, setBlockType] = useState('paragraph')
   const [selectedElementKey, setSelectedElementKey] = useState(null)
   const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false)
   const [codeLanguage, setCodeLanguage] = useState('')
   const [isRTL, setIsRTL] = useState(false)
   const [isLink, setIsLink] = useState(false)
   const [isBold, setIsBold] = useState(false)
   const [isItalic, setIsItalic] = useState(false)
   const [isUnderline, setIsUnderline] = useState(false)
   const [isStrikethrough, setIsStrikethrough] = useState(false)
   const [isCode, setIsCode] = useState(false)

   const updateToolbar = useCallback(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
         const anchorNode = selection.anchor.getNode()
         const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow()
         const elementKey = element.getKey()
         const elementDOM = editor.getElementByKey(elementKey)
         if (elementDOM !== null) {
            setSelectedElementKey(elementKey)
            if ($isListNode(element)) {
               const parentList = $getNearestNodeOfType(anchorNode, ListNode)
               const type = parentList ? parentList.getTag() : element.getTag()
               setBlockType(type)
            } else {
               const type = $isHeadingNode(element) ? element.getTag() : element.getType()
               setBlockType(type)
               if ($isCodeNode(element)) {
                  setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage())
               }
            }
         }
         // Update text format
         setIsBold(selection.hasFormat('bold'))
         setIsItalic(selection.hasFormat('italic'))
         setIsUnderline(selection.hasFormat('underline'))
         setIsStrikethrough(selection.hasFormat('strikethrough'))
         setIsCode(selection.hasFormat('code'))
         setIsRTL($isParentElementRTL(selection))

         // Update links
         const node = getSelectedNode(selection)
         const parent = node.getParent()
         if ($isLinkNode(parent) || $isLinkNode(node)) {
            setIsLink(true)
         } else {
            setIsLink(false)
         }
      }
   }, [editor])

   useEffect(() => {
      return mergeRegister(
         editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
               updateToolbar()
            })
         }),
         editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (_payload, newEditor) => {
               updateToolbar()
               return false
            },
            LowPriority
         ),
         editor.registerCommand(
            CAN_UNDO_COMMAND,
            (payload) => {
               setCanUndo(payload)
               return false
            },
            LowPriority
         ),
         editor.registerCommand(
            CAN_REDO_COMMAND,
            (payload) => {
               setCanRedo(payload)
               return false
            },
            LowPriority
         )
      )
   }, [editor, updateToolbar])

   const codeLanguges = useMemo(() => getCodeLanguages(), [])
   const onCodeLanguageSelect = useCallback(
      (e: any) => {
         editor.update(() => {
            if (selectedElementKey !== null) {
               const node = $getNodeByKey(selectedElementKey)
               if ($isCodeNode(node)) {
                  node.setLanguage(e.target.value)
               }
            }
         })
      },
      [editor, selectedElementKey]
   )

   const insertLink = useCallback(() => {
      if (!isLink) {
         editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://')
      } else {
         editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
      }
   }, [editor, isLink])

   return (
      <Box className='flex items-stretch gap-x-1 rounded-lg border-b p-2' ref={toolbarRef}>
         <Button
            size='icon'
            className='aspect-square h-8 w-8'
            variant='outline'
            disabled={!canUndo}
            aria-label='Undo'
            onClick={() => {
               editor.dispatchCommand(UNDO_COMMAND, undefined)
            }}
         >
            <Icon name='Undo' />
         </Button>
         <Button
            size='icon'
            className='aspect-square h-8 w-8'
            variant='outline'
            disabled={!canRedo}
            onClick={() => {
               editor.dispatchCommand(REDO_COMMAND, undefined)
            }}
            aria-label='Redo'
         >
            <Icon name='Redo' />
         </Button>

         <BlockOptionsDropdownList editor={editor} blockType={blockType} />

         <>
            <ToggleGroup type='multiple'>
               <ToggleGroupItem
                  value='bold'
                  size='sm'
                  aria-label='Toggle bold'
                  onClick={() => {
                     editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
                  }}
               >
                  <FontBoldIcon className='h-4 w-4' />
               </ToggleGroupItem>
               <ToggleGroupItem
                  value='italic'
                  size='sm'
                  aria-label='Toggle italic'
                  onClick={() => {
                     editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
                  }}
               >
                  <FontItalicIcon className='h-4 w-4' />
               </ToggleGroupItem>
               <ToggleGroupItem
                  value='strikethrough'
                  size='sm'
                  aria-label='Toggle strikethrough'
                  onClick={() => {
                     editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
                  }}
               >
                  <UnderlineIcon className='h-4 w-4' />
               </ToggleGroupItem>
            </ToggleGroup>
            {/* <Button
               size='icon'
               className='aspect-square h-8 w-8'
               variant='outline'
               onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
               }}
               // className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
               aria-label='Format Bold'
            >
               <Icon name='Bold' size={14} />
            </Button> */}
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
               }}
               className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
               aria-label='Format Italics'
            >
               <i className='format italic' />
            </button>
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
               }}
               className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
               aria-label='Format Underline'
            >
               <i className='format underline' />
            </button>
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
               }}
               className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
               aria-label='Format Strikethrough'
            >
               <i className='format strikethrough' />
            </button>
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')
               }}
               className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
               aria-label='Insert Code'
            >
               <i className='format code' />
            </button>
            <button onClick={insertLink} className={'toolbar-item spaced ' + (isLink ? 'active' : '')} aria-label='Insert Link'>
               <i className='format link' />
            </button>
            {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
            <Divider />
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
               }}
               className='toolbar-item spaced'
               aria-label='Left Align'
            >
               <i className='format left-align' />
            </button>
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
               }}
               className='toolbar-item spaced'
               aria-label='Center Align'
            >
               <i className='format center-align' />
            </button>
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
               }}
               className='toolbar-item spaced'
               aria-label='Right Align'
            >
               <i className='format right-align' />
            </button>
            <button
               onClick={() => {
                  editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
               }}
               className='toolbar-item'
               aria-label='Justify Align'
            >
               <i className='format justify-align' />
            </button>{' '}
         </>
      </Box>
   )
}

import { forwardRef, useId, useRef } from 'react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Textarea } from '..'
import { Control, FieldValues, Path } from 'react-hook-form'
import { TextareaProps } from '../@shadcn/textarea'

export interface TextareaFieldControlProps<T extends FieldValues> extends TextareaProps {
   name: Path<T>
   label: string
   control: Control<T>
   description?: string
}

function TextareaFieldControl<T extends FieldValues>(
   props: TextareaFieldControlProps<T> & React.PropsWithoutRef<T> & React.RefAttributes<T>,
   ref: React.ForwardedRef<HTMLTextAreaElement>
) {
   const { label, name, className, disabled, type, control, placeholder, description, onChange, ...restProps } = props
   const localRef = useRef<typeof Textarea.prototype>(null)
   const resolvedRef = (ref ?? localRef) as typeof localRef
   const id = useId()

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem>
               {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
               <FormControl>
                  <Textarea
                     {...field}
                     id={id}
                     placeholder={placeholder}
                     className='resize-none'
                     onChange={(e) => {
                        field.onChange(e)
                        if (onChange) onChange(e)
                     }}
                     ref={(e) => {
                        field.ref(e)
                        resolvedRef.current = e
                     }}
                     {...restProps}
                  />
               </FormControl>
               {description && <FormDescription>{description}</FormDescription>}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

TextareaFieldControl.displayName = 'TextareaFieldControl'

const ForwardedRefTextareaFieldControl = forwardRef(TextareaFieldControl)

export { ForwardedRefTextareaFieldControl }

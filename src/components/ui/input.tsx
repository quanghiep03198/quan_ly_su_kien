import { cn } from '@/common/utils/cn'
import * as React from 'react'
import { forwardRef, useRef } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface InputFieldControlProps extends InputProps {
   label: string
   description?: string
   control: Control<any>
   name: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
   return (
      <input
         type={type}
         className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
         )}
         ref={ref}
         {...props}
      />
   )
})

const InputFieldControl = forwardRef<HTMLInputElement, InputFieldControlProps>((props, ref) => {
   const { label, name, className, type, control, placeholder, description, onChange, ...restProps } = props
   const localRef = useRef<typeof Input.prototype>(null!)
   const resolvedRef = (ref ?? localRef) as typeof localRef

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input
                     {...field}
                     {...restProps}
                     placeholder={placeholder}
                     ref={(el) => {
                        field.ref(el)
                        resolvedRef.current = el
                     }}
                     type={type}
                     onChange={(e) => {
                        field.onChange(e)
                        if (onChange) onChange(e)
                     }}
                  />
               </FormControl>
               {description && <FormDescription>{description}</FormDescription>}
               <FormMessage />
            </FormItem>
         )}
      />
   )
})

Input.displayName = 'Input'
InputFieldControl.displayName = 'InputFieldControl'

export { Input, InputFieldControl }

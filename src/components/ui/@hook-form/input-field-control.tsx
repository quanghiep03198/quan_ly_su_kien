import React, { HTMLInputTypeAttribute, forwardRef, useId, useRef, useState } from 'react'
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '..'
import { Input, InputProps } from '../@shadcn/input'

export interface InputFieldControlProps<T extends FieldValues> extends InputProps {
   type: HTMLInputTypeAttribute
   name: Path<T>
   label: string
   control: Control<T>
   description?: string
}

export function InputFieldControl<T extends FieldValues>(
   props: InputFieldControlProps<T> & React.PropsWithoutRef<T> & React.RefAttributes<T>,
   ref: React.ForwardedRef<HTMLInputElement>
) {
   const { label, name, className, disabled, type, control, placeholder, description, onChange, ...restProps } = props
   const localRef = useRef<typeof Input.prototype>(null)
   const resolvedRef = (ref ?? localRef) as typeof localRef
   const id = useId()
   const [value, setValue] = useState('')

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldProps: ControllerRenderProps<T, Path<T>>) => {
      if (onChange) onChange(e)
      if (type === 'file') {
         setValue(e.target.value)
         fieldProps.onChange(e.target.files)
      } else {
         fieldProps.onChange(e)
      }
   }

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => {
            return (
               <FormItem>
                  {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
                  <FormControl>
                     <Input
                        {...field}
                        {...restProps}
                        id={id}
                        value={type === 'file' ? value : field.value}
                        placeholder={placeholder}
                        ref={(e) => {
                           field.ref(e)
                           if (!!resolvedRef) resolvedRef.current = e
                        }}
                        disabled={disabled}
                        type={type}
                        onChange={(event) => handleChange(event, field)}
                     />
                  </FormControl>
                  {description && <FormDescription>{description}</FormDescription>}
                  <FormMessage />
               </FormItem>
            )
         }}
      />
   )
}
InputFieldControl.displayName = 'InputFieldControl'

const ForwardedRefInputFieldControl = forwardRef(InputFieldControl)

export { ForwardedRefInputFieldControl }

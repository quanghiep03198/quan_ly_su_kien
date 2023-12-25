import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import { FormDescription, FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '..'

export type SelectFieldControlProps<T extends FieldValues> = {
   label: string
   placeholder?: string
   name: Path<T>
   options: Array<Record<'label' | 'value', string>>
   description?: string
   control: Control<T>
} & React.ComponentProps<typeof Select>

export function SelectFieldControl<T extends FieldValues>(props: SelectFieldControlProps<T>) {
   const { control, name, onValueChange, ...restProps } = props

   return (
      <FormField
         name={name!}
         control={control}
         render={({ field }) => {
            return (
               <FormItem>
                  <FormLabel>{props.label}</FormLabel>
                  <Select
                     {...field}
                     onValueChange={(value) => {
                        field.onChange(value)
                        if (onValueChange) {
                           onValueChange(value)
                        }
                     }}
                     {...restProps}
                  >
                     <SelectTrigger>
                        <SelectValue placeholder={props.placeholder} />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           {Array.isArray(props.options) &&
                              props.options.map((option) => (
                                 <SelectItem key={option.value} value={option.value?.toString()}>
                                    {option.label}
                                 </SelectItem>
                              ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
                  {props.description && <FormDescription>{props.description}</FormDescription>}
                  <FormMessage />
               </FormItem>
            )
         }}
      />
   )
}

SelectFieldControl.displayName = 'SelectFieldControl'
SelectFieldControl.defaultProps = {
   placeholder: 'Select...'
}

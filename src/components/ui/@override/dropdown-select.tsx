import { SelectTriggerProps } from '@radix-ui/react-select'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '..'
import React from 'react'

type DropdownSelectProps = {
   openState?: boolean
   placeholder?: string
   options: Record<'label' | 'value', string>[]
   onChange?: (value: string) => any | AnonymousFunction
} & SelectTriggerProps

export const DropdownSelect: React.FC<DropdownSelectProps> = ({ options, placeholder, openState, onChange, ...selectTrigerProps }) => {
   return (
      <Select
         open={openState}
         onValueChange={(value) => {
            if (onChange) onChange(value)
         }}
      >
         <SelectTrigger {...selectTrigerProps}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               {Array.isArray(options) &&
                  options.map((option) => (
                     <SelectItem key={option.value} value={option.value?.toString()}>
                        {option.label}
                     </SelectItem>
                  ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   )
}

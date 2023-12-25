'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, Popover, PopoverContent, PopoverTrigger, ScrollArea } from '..'
import { cn } from '@/common/utils/cn'

type ComboboxProps = {
   placeholder?: string
   className?: string
   options: Array<Record<'label' | 'value', any>>
   onChange: (value: string | number) => void
}

export const Combobox: React.FC<ComboboxProps> = ({ options, placeholder, className, onChange }) => {
   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState('')

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant='outline'
               role='combobox'
               aria-expanded={open}
               className={cn(
                  'justify-between',
                  {
                     'text-muted-foreground/50': !value
                  },
                  className
               )}
            >
               {value ? options.find((option) => option.value === value)?.label : placeholder}
               <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
         </PopoverTrigger>
         <PopoverContent className='w-56 p-0'>
            <Command>
               <CommandInput placeholder={placeholder} className='h-9' />
               <CommandEmpty>Không có kết quả phù hợp</CommandEmpty>
               <CommandGroup>
                  <ScrollArea className='h-80'>
                     {options.map((option) => (
                        <CommandItem
                           key={option.value}
                           value={option.value}
                           onSelect={(currentValue: (typeof options)[number]['value']) => {
                              setValue(currentValue === value ? '' : currentValue)
                              setOpen(false)
                              onChange(currentValue === value ? '' : currentValue)
                           }}
                        >
                           {option.label}
                           <CheckIcon className={cn('ml-auto h-4 w-4', value === option.value ? 'opacity-100' : 'opacity-0')} />
                        </CommandItem>
                     ))}
                  </ScrollArea>
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

Combobox.defaultProps = {
   placeholder: 'Search ...'
}

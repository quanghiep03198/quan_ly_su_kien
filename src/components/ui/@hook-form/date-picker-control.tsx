import { cn } from '@/common/utils/cn'
import { format } from 'date-fns'
import { Button, Calendar, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Icon, Popover, PopoverContent, PopoverTrigger } from '..'
import { Control, FieldValues, Path } from 'react-hook-form'

type DatePickerFieldControlProps<T extends FieldValues> = BaseFieldControl<T>

export function DatePickerFieldControl<T extends FieldValues>(props: DatePickerFieldControlProps<T>) {
   const { control, name, description, label, layout, hidden } = props

   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className={cn({ hidden, 'grid grid-cols-[1fr_2fr] items-center gap-2 space-y-0': layout === 'horizontal' })}>
               <FormLabel>{label}</FormLabel>
               <Popover>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant={'outline'}
                           className={cn(
                              'flex w-full items-center justify-start space-x-2 pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                           )}
                        >
                           <Icon name='Calendar' />
                           {field.value ? <span>{format(field.value, 'PPP')}</span> : <span>Pick a date</span>}
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                     <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        // disabled={(date: Date) => date < new Date() || date < new Date('1900-01-01')}
                     />
                  </PopoverContent>
               </Popover>
               {description && <FormDescription>{description}</FormDescription>}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

DatePickerFieldControl.displayName = 'DatePickerFieldControl'

import { isEmpty } from 'lodash'
import { useEffect, useLayoutEffect, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { Editor, FormControl, FormField, FormItem, FormLabel, FormMessage } from '..'

type EditorFieldControlProps<T extends FieldValues> = Omit<BaseFieldControl<T>, 'control'> & {
   form: UseFormReturn<T>
   errorMessage?: string
}

export function EditorFieldControl<T extends FieldValues>({ form, label, name, defaultValue, errorMessage }: EditorFieldControlProps<T>) {
   const [state, setState] = useState<{ value: string; isEmpty: boolean }>(() => ({ value: defaultValue ?? '', isEmpty: isEmpty(defaultValue) }))

   useLayoutEffect(() => {
      if (defaultValue) setState({ value: defaultValue, isEmpty: false })
   }, [defaultValue])

   useEffect(() => {
      if (state.isEmpty && form.formState.isSubmitted) {
         form.setError(name, { type: 'required', message: errorMessage ?? 'Vui lòng nhập nội dung' })
      } else {
         form.clearErrors(name)
      }
      form.setValue(name, state.value as PathValue<T, Path<T>>)
   }, [state, form.formState.isSubmitted])

   return (
      <FormField
         name={name}
         control={form.control}
         render={() => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Editor content={defaultValue} onUpdate={setState} />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

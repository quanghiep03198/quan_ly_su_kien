import { cn } from '@/common/utils/cn'
import { useEffect, useLayoutEffect, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { Editor, FormItem, FormMessage, Label } from '..'
import { isEmpty } from 'lodash'

type EditorFieldControlProps<T extends FieldValues> = Omit<BaseFieldControl<T>, 'control'> & {
   form: UseFormReturn<T>
}

export function EditorFieldControl<T extends FieldValues>({ form, label, name, defaultValue }: EditorFieldControlProps<T>) {
   const [state, setState] = useState<{ value: string; isEmpty: boolean }>(() => ({ value: defaultValue ?? '', isEmpty: isEmpty(defaultValue) }))

   useEffect(() => {
      if (state.isEmpty && form.formState.isSubmitted) {
         form.setError(name, { type: 'required', message: 'Vui lòng nhập nội dung' })
      } else {
         form.clearErrors(name)
      }

      form.setValue(name, state.value as PathValue<T, Path<T>>)
   }, [state, form.formState.isSubmitted])

   useLayoutEffect(() => {
      if (defaultValue) setState((prev) => ({ ...prev, isEmpty: false }))
   }, [defaultValue])

   return (
      <FormItem>
         <Label className={cn({ 'text-destructive': form.getFieldState(name).error })}>{label}</Label>
         <Editor content={defaultValue} onUpdate={setState} />
         {form.getFieldState(name).error && <FormMessage>{form.getFieldState(name).error?.message}</FormMessage>}
      </FormItem>
   )
}

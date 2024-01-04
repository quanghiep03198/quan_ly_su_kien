import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Control, ControllerRenderProps, FieldValues, Path, PathValue, UseFormReturn, useFormContext, useFormState } from 'react-hook-form'
import { Editor, FormDescription, FormField, FormItem, FormMessage, Label } from '..'
import { debounce } from 'lodash'

type EditorFieldControlProps<T extends FieldValues> = {
   form: UseFormReturn<T>
   defaultValue?: string
   name: Path<T>
   control?: Control<T>
   label?: string
   description?: string
}

export function EditorFieldControl<T extends FieldValues>({ form, label, name }: EditorFieldControlProps<T>) {
   const id = useId()
   const [state, setState] = useState<{ value: string; isEmpty: boolean }>(() => ({ value: form.getValues(name), isEmpty: true }))

   // const timeoutRef = useRef<NodeJS.Timeout | null>(null)

   useEffect(() => {
      if (state.isEmpty) form.setError(name, { message: 'Vui lòng nhập nội dung' })
      else form.clearErrors(name)
      if (form.formState.isSubmitting) form.setValue(name, state.value as PathValue<T, Path<T>>)
   }, [state, form])

   return (
      <FormItem>
         {label && <Label htmlFor={id}>{label}</Label>}
         <Editor id={id} content={form.getValues(name)} onUpdate={setState} />
         {form.getFieldState(name).error && <FormMessage>{form.getFieldState(name)?.error?.message}</FormMessage>}
      </FormItem>
   )
}

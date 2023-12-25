export const createFormData = (formValue: Record<string, any>) => {
   try {
      const formData = new FormData()
      Object.entries(formValue).forEach(([key, value]) => {
         //     if (value instanceof File)
         //    formData.append(key, (value as any).file[0]);
         //  else
         formData.append(key, value)
      })
      return formData
   } catch (error) {
      throw error
   }
}

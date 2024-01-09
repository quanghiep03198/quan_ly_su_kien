import { z } from 'zod'

export const NotificationSchema = z.object({
   title: z.string({ required_error: 'Vui lòng nhập tiêu đề' }),
   content: z.string({ required_error: 'Vui lòng nhập nội dung' })
})

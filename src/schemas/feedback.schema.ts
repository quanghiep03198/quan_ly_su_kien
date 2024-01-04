import { z } from 'zod'

export const FeedbackSchema = z.object({
   content: z.string({ required_error: 'Vui lòng nhập nội dung feedback' })
})

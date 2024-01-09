import Regex from '@/common/constants/regex'
import { compareAsc } from 'date-fns'
import * as z from 'zod'

const BaseEventSchema = z.object({
   name: z.string({ required_error: 'Vui lòng nhập tên sự kiện' }).min(1, { message: 'Vui lòng nhập tên sự kiện' }),
   location: z.string({ required_error: 'Vui lòng nhập địa điệm tổ chức' }).min(1, { message: 'Vui lòng nhập địa điệm tổ chức' }),
   contact: z.string().min(1, { message: 'Vui lòng nhập số điện thoại liên hệ' }).regex(Regex.phone, { message: 'Số điện thoại không đúng định dạng' }),
   content: z.string().optional(),
   description: z.string({ required_error: 'Vui lòng nhập mô tả sự kiện' }),
   banner: z.any({ required_error: 'Vui lòng tải lên ảnh' }),
   user_id: z
      .string({ required_error: 'Vui lòng chọn người phụ trách' })
      .transform((value) => +value)
      .optional(),
   start_time: z.date({ required_error: 'Vui lòng chọn ngày bắt đầu' }),
   end_time: z.date({ required_error: 'Vui lòng chọn ngày kết thúc' })
})

export const CreateEventSchema = BaseEventSchema.refine(
   (values) => {
      return compareAsc(new Date(values.start_time), new Date(values.end_time)) === -1
   },
   {
      message: 'Ngày kết thúc phải lơn hơn ngày bắt đầu',
      path: ['end_time']
   }
)

export const UpdateEventSchema = z.object({ ...BaseEventSchema.shape, banner: z.any().optional() }).refine(
   (values) => {
      return compareAsc(new Date(values.start_time), new Date(values.end_time)) === -1
   },
   {
      message: 'Ngày kết thúc phải lơn hơn ngày bắt đầu',
      path: ['end_time']
   }
)

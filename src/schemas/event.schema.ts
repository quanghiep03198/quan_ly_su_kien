import Regex from '@/common/constants/regex'
import { z } from 'zod'

export const EventSchema = z.object({
   name: z.string({ required_error: 'Vui lòng nhập tên sự kiện' }).min(1, { message: 'Vui lòng nhập tên sự kiện' }),
   location: z.string({ required_error: 'Vui lòng nhập địa điệm tổ chức' }).min(1, { message: 'Vui lòng nhập địa điệm tổ chức' }),
   contact: z.string().min(1, { message: 'Vui lòng nhập số điện thoại liên hệ' }).regex(Regex.phone, { message: 'Số điện thoại không đúng định dạng' }),
   content: z.string({ required_error: 'Vui lòng nhập nội dụng sự kiện' }),
   description: z.string({ required_error: 'Vui lòng nhập mô tả sự kiện' }),
   banner: z.any({ required_error: 'Vui lòng tải lên ảnh' }),
   user_id: z.string({ required_error: 'Vui lòng chọn người phụ trách' }).transform((value) => +value),
   start_time: z.date({ required_error: 'Vui lòng chọn ngày bắt đầu' }),
   end_time: z.date({ required_error: 'Vui lòng chọn ngày kết thúc' })
   // status: z.string({ required_error: 'Vui lòng nhập trạng thái' }).transform((value) => +value),
})

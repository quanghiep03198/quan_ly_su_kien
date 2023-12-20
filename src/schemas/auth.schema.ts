import Regex from '@/common/constants/regex'
import * as z from 'zod'

export const signinSchema = z.object({
   email: z.string().min(1, 'Vui lòng nhập email').email('Email không đúng định dạng'),
   password: z.string().min(1, 'Vui lòng nhập mật khẩu')
})

export const registerSchema = z
   .object({
      name: z.string().min(1, 'Vui lòng nhập tên của bạn'),
      email: z.string().min(1, 'Vui lòng nhập email').email('Email không đúng định dạng'),
      password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
      confirmPassword: z.string().min(1, 'Vui lòng nhập mật khẩu xác thực'),
      phone: z.string().min(1, 'Vui lòng nhập số điện thoại').max(10).regex(Regex.phone, { message: 'Số điện thoại không hợp lệ' })
   })
   .refine(
      (schema) => {
         console.log('schema', schema)
         return schema.password === schema.confirmPassword
      },
      {
         message: 'Mật khẩu xác thực không khớp',
         path: ['confirmPassword']
      }
   )

import Regex from '@/common/constants/regex'
import * as z from 'zod'

export const SigninSchema = z.object({
   email: z.string({ required_error: 'Vui lòng nhập email' }).email('Email không đúng định dạng'),
   password: z.string({ required_error: 'Vui lòng nhập mật khẩu' })
})

export const RegisterSchema = z
   .object({
      name: z.string({ required_error: 'Vui lòng nhập tên của bạn' }),
      email: z
         .string({ required_error: 'Vui lòng nhập email' })
         .email('Email không đúng định dạng')
         .regex(Regex.email, { message: 'Email phải có định dạng xxx@gmail.com / xxx@fpt.edu.vn' }),
      password: z.string({ required_error: 'Vui lòng nhập mật khẩu' }).min(6, 'Mật khẩu phải có tối thiểu 6 ký tự'),
      confirmPassword: z.string({ required_error: 'Vui lòng nhập mật khẩu xác thực' }),
      phone: z.string({ required_error: 'Vui lòng nhập số điện thoại' }).regex(Regex.phone, { message: 'Số điện thoại không hợp lệ' })
   })
   .refine(
      (values) => {
         return values.password === values.confirmPassword
      },
      {
         message: 'Passwords must match!',
         path: ['confirmPassword']
      }
   )

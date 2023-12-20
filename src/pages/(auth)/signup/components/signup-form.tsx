import { useToast } from '@/common/hooks/use-toast'
import { Button, Form, InputFieldControl } from '@/components/ui'
import { useSignupMutation } from '@/redux/apis/auth.api'
import { registerSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { StyledForm } from './styled'
import { User } from '@/common/types/entities'

type FormValues = Omit<User, 'id'>

const SignupForm: React.FunctionComponent = () => {
   const form = useForm<FormValues>({
      resolver: zodResolver(registerSchema)
   })
   const { toast } = useToast()
   const [mutate, { isLoading }] = useSignupMutation()

   const handleSignup = async (data: FormValues) => {
      try {
         console.log(data)
         toast({ description: 'Hello' })
      } catch (error) {
         toast({ variant: 'destructive', title: 'Đăng nhập không thành công', description: (error as any).data.message })
      }
   }

   return (
      <Form {...form}>
         <StyledForm onSubmit={form.handleSubmit(handleSignup)}>
            <InputFieldControl name='name' type='text' placeholder='Nguyễn Y Vân' label='Họ tên' control={form.control} />
            <InputFieldControl
               name='email'
               type='email'
               placeholder='user@fpt.edu.vn'
               label='Email'
               description='Email đăng nhập sử dụng "@gmail" hoặc "@fpt"'
               control={form.control}
            />
            <InputFieldControl name='password' type='password' label='Mật khẩu' placeholder='******' control={form.control} />
            <InputFieldControl name='confirmPassword' type='password' label='Xác nhận mật khẩu' placeholder='******' control={form.control} />
            <Button type='submit' variant='default'>
               Đăng ký
            </Button>
         </StyledForm>
      </Form>
   )
}

export default SignupForm

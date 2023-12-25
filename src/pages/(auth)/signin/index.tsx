import { Theme } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import useTheme from '@/common/hooks/use-theme'
import { cn } from '@/common/utils/cn'
import ThemeSelect from '@/components/shared/theme-select'
import { Box, Button, Checkbox, Form, FormLabel, Icon, InputFieldControl, Typography } from '@/components/ui'
import { useSigninMutation } from '@/redux/apis/auth.api'
import { SigninSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Image, Paragraph, StyledForm } from './components/styled'
import { toast } from 'sonner'
import { buttonVariants } from '@/components/ui/@shadcn/button'

type FormValue = z.infer<typeof SigninSchema>
const Signin: React.FunctionComponent = () => {
   const form = useForm<FormValue>({
      resolver: zodResolver(SigninSchema)
   })
   const { theme } = useTheme()
   const [mutate, { isLoading }] = useSigninMutation()
   const navigate = useNavigate()

   const handleSignin = async (data: FormValue) => {
      try {
         const response = await mutate(data).unwrap()
         toast.success(response.message)
         navigate(Paths.REDIRECT)
      } catch (error) {
         const errorResponse = error as ErrorResponse
         toast.error(errorResponse.data.message)
      }
   }

   return (
      <>
         <Box className=' flex h-screen w-full items-center justify-center overflow-hidden bg-background'>
            <Box className='fixed left-auto right-auto top-0 flex w-full items-center justify-between gap-x-2 p-2'>
               <Link className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-x-2')} to='/'>
                  <Icon name='ArrowLeft' /> Trang chủ
               </Link>
               <ThemeSelect />
            </Box>
            <Box className='flex flex-col items-center justify-center gap-10'>
               <Image src={theme === Theme.LIGHT ? '/logo.png' : 'logo.webp'} />
               <Typography variant='heading5'>Đăng nhập vào tài khoản</Typography>
               <Box className='w-full rounded-xl border bg-background p-8'>
                  <Form {...form}>
                     <StyledForm onSubmit={form.handleSubmit(handleSignin)}>
                        <InputFieldControl
                           name={'email'}
                           type='email'
                           placeholder='user@fpt.edu.vn'
                           label='Email'
                           description='Email đăng nhập sử dụng "gmail" hoặc "fpt"'
                           control={form.control}
                        />
                        <InputFieldControl name='password' type='password' label='Mật khẩu' placeholder='******' control={form.control} />
                        <Box className='flex items-center justify-between'>
                           <Box className='flex items-center space-x-2'>
                              <Checkbox id='remember-checkbox' />
                              <FormLabel htmlFor='rememeber-checkbox'>Ghi nhớ tôi</FormLabel>
                           </Box>
                           <Link to={Paths.RECOVER_PASSOWRD} className='font-medium text-primary'>
                              Quên mật khẩu?
                           </Link>
                        </Box>
                        <Button type='submit' variant='default' className='inline-flex items-center gap-x-3' disabled={isLoading}>
                           <Icon name='LogIn' />
                           Đăng nhập
                        </Button>
                     </StyledForm>
                  </Form>
               </Box>
               <Paragraph>
                  Chưa có tài khoản?{' '}
                  <Link className={cn('font-medium text-primary')} to={Paths.SIGNUP}>
                     Đăng ký ngay
                  </Link>
               </Paragraph>
            </Box>
         </Box>
      </>
   )
}

export default Signin

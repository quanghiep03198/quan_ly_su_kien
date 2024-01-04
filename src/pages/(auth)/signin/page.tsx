import { Theme } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import useTheme from '@/common/hooks/use-theme'
import { cn } from '@/common/utils/cn'
import ThemeSelect from '@/components/shared/theme-select'
import { Box, Button, Checkbox, Form, FormLabel, Icon, InputFieldControl, Typography } from '@/components/ui'
import { GoogleIcon } from '@/components/ui/@custom/icons'
import { buttonVariants } from '@/components/ui/@shadcn/button'
import { useSigninMutation } from '@/redux/apis/auth.api'
import { useAppDispatch } from '@/redux/hook'
import { signinWithGoogle } from '@/redux/slices/auth.slice'
import { SigninSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin } from '@react-oauth/google'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { Divider } from '../../../components/ui/@custom/divider'
import { Image, Paragraph, StyledForm } from './components/styled'

type FormValue = z.infer<typeof SigninSchema>
const Signin: React.FunctionComponent = () => {
   const form = useForm<FormValue>({
      resolver: zodResolver(SigninSchema)
   })
   const { theme } = useTheme()
   const [mutate, { isLoading }] = useSigninMutation()
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const login = useGoogleLogin({
      onSuccess: async (response) => {
         try {
            const data = (await dispatch(signinWithGoogle(`${response.token_type} ${response.access_token}`)).unwrap()) as unknown as HttpResponse<any>
            window.localStorage.setItem('access_token', `Bearer ${data?.metadata?.access_token}`)
            toast.success('Đăng nhập thành công')
            navigate(Paths.HOME)
         } catch (error) {
            toast.error('Failed to login!')
         }
      },
      onError: () => toast.error('Đăng nhập thất bại')
   })

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
         <Box className='flex w-full flex-col items-center justify-center overflow-auto bg-background px-4'>
            <Box className='left-auto right-auto top-0 flex w-full items-center justify-between gap-x-2 py-2'>
               <Link className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-x-2')} to='/'>
                  <Icon name='ArrowLeft' /> Trang chủ
               </Link>
               <ThemeSelect />
            </Box>
            <Box className='flex flex-col items-center justify-center gap-10 pb-10 sm:w-full md:w-full md:max-w-md'>
               <Image src={theme === Theme.LIGHT ? '/logo.png' : 'logo.webp'} />
               <Typography variant='heading5'>Đăng nhập vào tài khoản</Typography>
               <Box className='flex w-full flex-col items-stretch gap-y-6 rounded-xl border bg-background p-8'>
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
                        <Button type='submit' variant='outline' className='inline-flex items-center gap-x-3' disabled={isLoading}>
                           <Icon name='LogIn' />
                           Đăng nhập
                        </Button>
                     </StyledForm>
                  </Form>{' '}
                  <Divider>hoặc đăng nhập với</Divider>
                  <Button variant='default' className='w-full gap-x-2' onClick={() => login()}>
                     <GoogleIcon />
                     Google
                  </Button>
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

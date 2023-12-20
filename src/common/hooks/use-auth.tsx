import { useAppDispatch } from '@/redux/hook'
import { User } from '../types/entities'
import { useNavigate } from 'react-router-dom'
import { toast } from './use-toast'
import { useSigninMutation } from '@/redux/apis/auth.api'
import { HttpStatusCode } from 'axios'
import { signout } from '@/redux/slices/auth.slice'

export default function useAuth() {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const [mutate, { isLoading }] = useSigninMutation()

   const login = async (data: Pick<User, 'email' | 'password'>) => {
      try {
         const response = await mutate(data).unwrap()
         toast({ description: response.message })
         navigate('/')
      } catch (error) {
         const errorResponse = error as unknown as { data: HttpResponse<undefined>; status: HttpStatusCode }
         toast({ variant: 'destructive', title: 'Đăng nhập không thành công', description: errorResponse.data.message })
      }
   }

   const logout = () => dispatch(signout())

   return {
      signout: logout,
      signin: [login, isLoading],
      signup: null
   }
}

import { Box, Button, Form, InputFieldControl, TextareaFieldControl, Typography } from '@/components/ui'
import { useUpdateUserInfoMutation } from '@/redux/apis/auth.api'
import { useAppSelector } from '@/redux/hook'
import { UpdateUserSchema } from '@/schemas/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import tw from 'tailwind-styled-components'
import { z } from 'zod'
import AvatarUpload from './avatar-upload'
import UpdateProfileForm from './update-profile-form'

type FormValue = z.infer<typeof UpdateUserSchema>

const AccountSettingsPanel: React.FunctionComponent = () => {
   return (
      <Box className='relative z-10 mx-auto w-full max-w-7xl rounded-lg border bg-background shadow-2xl'>
         <Box className='space-y-1 border-b px-8 py-4 sm:px-4'>
            <Typography variant='h6' className='mb-0'>
               Tài khoản
            </Typography>
            <Typography variant='p' color='muted'>
               Cập nhật thông tin tài khoản của bạn
            </Typography>
         </Box>
         <Box className='flex w-full items-start gap-x-10 py-4 sm:flex-col sm:gap-y-6'>
            <AvatarUpload />
            <UpdateProfileForm />
         </Box>
      </Box>
   )
}

const StyledForm = tw.form`flex flex-col gap-y-6 max-w-xl h-full`

export default AccountSettingsPanel

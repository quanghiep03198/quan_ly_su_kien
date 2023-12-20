import { UserRoleEnum } from '@/common/constants/enums'
import { AUTH_PATHS, MANAGER_PATHS } from '@/common/constants/pathnames'
import { useAppSelector } from '@/redux/hook'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
   const user = useAppSelector((state) => state.auth.user)
   const navigate = useNavigate()

   switch (user?.role) {
      case UserRoleEnum.STUDENT:
         navigate(AUTH_PATHS.SIGNIN)
         break
      case UserRoleEnum.STAFF:
         navigate(AUTH_PATHS.SIGNIN)
         break
      case UserRoleEnum.MANAGER:
         navigate(MANAGER_PATHS.EVENTS_MANAGEMENT)
         break
      default:
         navigate(AUTH_PATHS.SIGNIN)
         break
   }
   return null
}

export default Navigation

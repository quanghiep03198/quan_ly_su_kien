import { UserRoleEnum } from '@/common/constants/enums'
import { Paths } from '@/common/constants/pathnames'
import { useAppSelector } from '@/redux/hook'
import { UserType } from '@/common/types/entities'
import { Navigate } from 'react-router-dom'

declare type RoleGuardProps = {
   roles: Array<UserRoleEnum>
} & React.PropsWithChildren

const RoleGuard: React.FC<RoleGuardProps> = (props) => {
   const user: Partial<UserType> | null = useAppSelector((state) => state.auth.user)
   return props.roles.includes(user?.role as UserRoleEnum) ? props.children : <Navigate to={Paths.PERMISSION_DENIED} />
}

export default RoleGuard

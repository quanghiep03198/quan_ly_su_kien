import { AUTH_PATHS } from '@/common/constants/pathnames'
import { Link } from 'react-router-dom'
import { Paragraph } from './styled'

const FormFooter: React.FunctionComponent = () => {
   return (
      <Paragraph>
         Đã có tài khoản?{' '}
         <Link to={AUTH_PATHS.SIGNIN} className='font-medium text-primary'>
            Đăng nhập
         </Link>
      </Paragraph>
   )
}

export default FormFooter

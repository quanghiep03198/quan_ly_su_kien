import ThemeSelect from '@/components/shared/theme-select'
import { Box } from '@/components/ui'
import Banner from './components/banner'
import FormFooter from './components/form-footer'
import FormHeader from './components/form-header'
import SignupForm from './components/signup-form'
import { Divider as FormDivider } from './components/styled'

const Signup: React.FunctionComponent = () => {
   return (
      <Box className='relative flex h-fit w-full items-stretch scrollbar-none'>
         <Box className='fixed right-2 top-2'>
            <ThemeSelect />
         </Box>
         <Banner />
         <Box className='flex min-h-fit w-full basis-1/2 flex-col items-center justify-center gap-10 scrollbar-none sm:basis-full sm:p-3 md:basis-full md:p-10 lg:basis-full lg:p-10'>
            <FormHeader />
            <SignupForm />
            <FormDivider>hoặc</FormDivider>
            <FormFooter />
         </Box>
      </Box>
   )
}

export default Signup

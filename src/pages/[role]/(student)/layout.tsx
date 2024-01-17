import { Box } from '@/components/ui'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'

import Fallback from '@/components/shared/fallback'
const Layout: React.FunctionComponent = () => {
   return (
      <Box className='item-stretch flex min-h-screen flex-col' as='main'>
         <Header />
         <Box className='h-full flex-1'>
            <Suspense fallback={<Fallback />}>
               <Outlet />
            </Suspense>
         </Box>
         <Footer />
      </Box>
   )
}

export default Layout

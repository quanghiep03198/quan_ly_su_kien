import { Box } from '@/components/ui'
import React, { Suspense } from 'react'
import LoadingProgressBar from '@/components/shared/loading-progress-bar'
import { Outlet } from 'react-router-dom'
import Footer from './components/footer'
import Header from './components/header'

const Layout: React.FunctionComponent = () => {
   return (
      <Box className='item-stretch flex min-h-screen flex-col' as='main'>
         <Header />
         <Box className='h-full flex-1'>
            <Suspense fallback={<LoadingProgressBar />}>
               <Outlet />
            </Suspense>
         </Box>
         <Footer />
      </Box>
   )
}

export default Layout

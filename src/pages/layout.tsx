import { Paths } from '@/common/constants/pathnames'
import LoadingProgressBar from '@/components/shared/loading-progress-bar'
import { metadata } from '@/configs/metadata.config'
import { useAppSelector } from '@/redux/hook'
import React, { Suspense, useEffect } from 'react'
import { Outlet, matchPath, useLocation, useNavigate } from 'react-router-dom'

const RootLayout: React.FunctionComponent = () => {
   const { pathname } = useLocation()
   const authenticated = useAppSelector((state) => state.auth.authenticated)
   const navigate = useNavigate()

   useEffect(() => {
      if (authenticated && ([Paths.SIGNIN, Paths.SIGNUP] as Array<string>).includes(pathname)) navigate(-1)
      const currentPath = Object.keys(metadata).find((path) => !!matchPath(path, pathname))
      document.title = metadata[currentPath as keyof typeof metadata] ?? 'Sự kiện Fpoly'
   }, [pathname])

   return (
      <Suspense fallback={<LoadingProgressBar />}>
         <Outlet />
      </Suspense>
   )
}

export default RootLayout

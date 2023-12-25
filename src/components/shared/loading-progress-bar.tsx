import { useEffect } from 'react'
import nProgress from 'nprogress'
import '@/styles/nprogress.css'

const LoadingProgressBar: React.FunctionComponent = () => {
   nProgress.configure({
      showSpinner: false
   })
   useEffect(() => {
      nProgress.start()

      return () => {
         nProgress.done()
      }
   }, [])

   return null
}

export default LoadingProgressBar

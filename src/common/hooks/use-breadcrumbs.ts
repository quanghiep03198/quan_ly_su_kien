import { breadcrumbs } from '@/configs/breadcrumbs.config'
import { matchPath, useLocation } from 'react-router-dom'

export default function useBreadcrumbs() {
   const { pathname } = useLocation()
   const path = Object.keys(breadcrumbs).find((path) => Boolean(matchPath(path, pathname))) as unknown as keyof typeof breadcrumbs
   return breadcrumbs[path]
}

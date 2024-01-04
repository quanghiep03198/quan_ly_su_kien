import _ from 'lodash'
import { useLocation, useSearchParams } from 'react-router-dom'
import * as qs from 'qs'

export default function useQueryParams(...path: string[]) {
   const { search } = useLocation()
   const [params] = useSearchParams()

   if (path.length === 0) return qs.parse(search, { ignoreQueryPrefix: true })
   return _.pick(Object.fromEntries(params.entries()), path)
}

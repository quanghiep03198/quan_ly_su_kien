import { FallbackContext, FallbackType } from '@/components/providers/fallback-provider'
import * as React from 'react'

export default function usePage() {
   const { updateFallback } = React.useContext(FallbackContext)

   const onLoad = React.useCallback(
      (component: FallbackType | undefined) => {
         if (component === undefined) component = null
         updateFallback(component)
      },
      [updateFallback]
   )

   return { onLoad }
}

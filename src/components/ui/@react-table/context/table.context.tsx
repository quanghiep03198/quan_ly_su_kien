import { Table } from '@tanstack/react-table'
import * as _ from 'lodash'
import { PropsWithChildren, createContext, useRef, useState } from 'react'

type TableProviderProps = {
   areAllFiltersCleared: boolean
} & PropsWithChildren

type TableContext = {
   isScrolling: boolean
   handleScroll: () => void
} & Pick<TableProviderProps, 'areAllFiltersCleared'>

export const TableContext = createContext<TableContext>({
   isScrolling: false,
   areAllFiltersCleared: false,
   handleScroll: () => {}
})

export const TableProvider: React.FC<TableProviderProps> = ({ areAllFiltersCleared, children }) => {
   const [isScrolling, setIsScrolling] = useState(false)
   const timeoutRef = useRef<NodeJS.Timeout | null>(null)

   const handleScroll = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current!)
      setIsScrolling(true)
      timeoutRef.current = setTimeout(() => {
         setIsScrolling(false)
      }, 100)
   }

   return <TableContext.Provider value={{ isScrolling, areAllFiltersCleared, handleScroll }}>{children}</TableContext.Provider>
}

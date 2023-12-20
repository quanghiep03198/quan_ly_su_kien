import { useLocalStorage } from '@/common/hooks/use-storage'
import React, { createContext, useContext, useEffect } from 'react'

declare type Theme = 'dark' | 'light' | 'system'

declare type ThemeProviderProps = {
   children: React.ReactNode
   defaultTheme?: Theme
}

declare type ThemeProviderState = {
   theme: Theme
   setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const initialState: ThemeProviderState = {
   theme: 'system',
   setTheme: function () {}
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = 'system', ...props }: ThemeProviderProps) => {
   const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultTheme)

   useEffect(() => {
      const root = window.document.documentElement

      root.classList.remove('light', 'dark')

      if (theme === 'system') {
         const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

         root.classList.add(systemTheme)
         return
      }

      root.classList.add(theme as Theme)
   }, [theme])

   return (
      <ThemeProviderContext.Provider
         {...props}
         value={
            {
               theme: theme,
               setTheme
            } as ThemeProviderState
         }
      >
         {children}
      </ThemeProviderContext.Provider>
   )
}

export { ThemeProviderContext, ThemeProvider }

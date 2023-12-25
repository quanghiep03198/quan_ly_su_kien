import './styles/index.css'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/providers/theme-provider'
import { persistor, store } from './redux/store'
import Router from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <PersistGate persistor={persistor}>
         <ThemeProvider>
            <Toaster
               toastOptions={{
                  classNames: {
                     error: 'bg-destructive'
                     // success: 'text-green-400',
                     // warning: 'text-yellow-400',
                     // info: 'bg-blue-400'
                  }
               }}
            />
            <Router />
         </ThemeProvider>
      </PersistGate>
   </Provider>
)

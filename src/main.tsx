import './styles/index.css'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './components/providers/theme-provider'
import Router from './routes'
import { persistor, store } from './redux/store'
import { Toaster } from './components/ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <PersistGate persistor={persistor}>
         <ThemeProvider>
            <Toaster />
            <Router />
         </ThemeProvider>
      </PersistGate>
   </Provider>
)

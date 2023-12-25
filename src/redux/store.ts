import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './root.reducer'
import { authApi } from './apis/auth.api'
import { eventApi } from './apis/event.api'
import { participantApi } from './apis/participant.api'

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
         }
      }).concat([authApi.middleware, eventApi.middleware, participantApi.middleware])
})

const persistor = persistStore(store)

export { persistor, store }

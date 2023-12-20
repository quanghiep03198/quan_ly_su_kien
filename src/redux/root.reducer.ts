import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './slices/auth.slice'
import authApi from './apis/auth.api'
import eventApi from './apis/event.api'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [authApi.reducerPath]: authApi.reducer,
   [eventApi.reducerPath]: eventApi.reducer
})

export default rootReducer

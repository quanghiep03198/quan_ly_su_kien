import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth.slice'
import { authApi } from './apis/auth.api'
import { eventApi } from './apis/event.api'
import { participantApi } from './apis/participant.api'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [authApi.reducerPath]: authApi.reducer,
   [eventApi.reducerPath]: eventApi.reducer,
   [participantApi.reducerPath]: participantApi.reducer
})

export default rootReducer

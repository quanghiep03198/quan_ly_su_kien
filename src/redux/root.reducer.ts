import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth.slice'
import { authApi } from './apis/auth.api'
import { eventApi } from './apis/event.api'
import { participantApi } from './apis/participant.api'
import { statisticApi } from './apis/statistics.api'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [authApi.reducerPath]: authApi.reducer,
   [eventApi.reducerPath]: eventApi.reducer,
   [statisticApi.reducerPath]: statisticApi.reducer,
   [participantApi.reducerPath]: participantApi.reducer
})

export default rootReducer

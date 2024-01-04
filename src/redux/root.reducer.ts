import { combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './slices/auth.slice'
import { authApi } from './apis/auth.api'
import { eventApi } from './apis/event.api'
import { participantApi } from './apis/participant.api'
import { statisticApi } from './apis/statistics.api'
import { feedbackApi } from './apis/feedback.api'
import { attendanceApi } from './apis/attendance.api'

const rootReducer = combineReducers({
   [authSlice.name]: authSlice.reducer,
   [authApi.reducerPath]: authApi.reducer,
   [eventApi.reducerPath]: eventApi.reducer,
   [statisticApi.reducerPath]: statisticApi.reducer,
   [participantApi.reducerPath]: participantApi.reducer,
   [feedbackApi.reducerPath]: feedbackApi.reducer,
   [attendanceApi.reducerPath]: attendanceApi.reducer
})

export default rootReducer

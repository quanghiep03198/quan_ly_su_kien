import { User } from '@/common/types/entities'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import authApi from '../apis/auth.api'
import * as _ from 'lodash'
import generatePicture from '@/common/utils/generate-picture'

type AuthSliceState = {
   user: Omit<User, 'password'> | null
   authenticated: boolean
}

type SigninResponseData = HttpResponse<Omit<User, 'password'> & { token: string }>

const initialState: AuthSliceState = { user: null, authenticated: false }

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      signout: () => initialState
   },
   extraReducers: (build) => {
      build.addMatcher(authApi.endpoints.signin.matchFulfilled, (state: AuthSliceState, action: PayloadAction<SigninResponseData>) => {
         const payload = _.pick(action.payload?.metadata, ['id', 'email', 'name', 'phone', 'role']) as Omit<User, 'password'>
         state.user = { ...payload, picture: generatePicture(payload?.name) }
         state.authenticated = true
         return state
      })
   }
})

const { signout } = authSlice.actions

export { authSlice as default, signout }
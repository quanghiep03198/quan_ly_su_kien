import { UserType } from '@/common/types/entities'
import generatePicture from '@/common/utils/generate-picture'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import * as _ from 'lodash'
import { authApi } from '../apis/auth.api'

type AuthSliceState = {
   user: Omit<UserType, 'password'> | null
   authenticated: boolean
}
type SigninResponseData = HttpResponse<Omit<UserType, 'password'> & { token: string }>

/**
 * Async thunk actions
 */
export const signinWithGoogle = createAsyncThunk('auth/google', async (oauth2Token: string, { rejectWithValue, signal }) => {
   try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/auth/google', { headers: { Authorization: oauth2Token }, signal })
      return response.data
   } catch (error) {
      rejectWithValue(null)
   }
})

const initialState: AuthSliceState = { user: null, authenticated: false }

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      signout: () => initialState
   },
   extraReducers: (build) => {
      build.addCase(signinWithGoogle.fulfilled, (_state, action: PayloadAction<any>) => {
         const payload = _.pick(action.payload?.metadata?.user, ['id', 'email', 'name', 'phone', 'role', 'avatar']) as Omit<UserType, 'password'>
         return { user: payload, authenticated: true }
      })
      build.addMatcher(authApi.endpoints.signin.matchFulfilled, (_state: AuthSliceState, action: PayloadAction<SigninResponseData>) => {
         const payload = _.pick(action.payload?.metadata, ['id', 'email', 'name', 'phone', 'role', 'avatar']) as Omit<UserType, 'password'>
         return {
            user: { ...payload, avatar: generatePicture(payload?.name) },
            authenticated: true
         }
      })
   }
})

/**
 * Redux actions
 */
export const { signout } = authSlice.actions

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {type AuthState, type UserData } from '../types/store/auth'


const initialState: AuthState = {
  username: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsersData: (state, action:PayloadAction<UserData>) => {
      const { username, token } = action.payload
      console.log(action)
      state.token = token
      state.username = username
    },
    clearUser: (state) => {
      state.token = null
      state.username = null
    },
  },
})


export default authSlice.reducer
export const { setUsersData, clearUser } = authSlice.actions
export const selectUsername = (state: { auth: AuthState }) => state.auth.username
export const selectToken = (state: { auth: AuthState }) => state.auth.token
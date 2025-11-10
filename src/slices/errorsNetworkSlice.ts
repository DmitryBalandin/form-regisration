import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ErrorNetworkState } from '../types/store/errorsNetworks'


const initialState:ErrorNetworkState = {
  isError: false,
  error: null,
}

const errorNetworkSlice = createSlice({
  name: 'errorNetwork',
  initialState,
  reducers: {
    setErrorNetwork: (state, action:PayloadAction<{error:string}>) => {
      const { error } = action.payload
      state.isError = true
      state.error = error
    },
    clearErrorNetwork: (state) => {
      state.isError = false
      state.error = null
    },
  },
})

export default errorNetworkSlice.reducer
export const { setErrorNetwork, clearErrorNetwork } = errorNetworkSlice.actions
export const selectErrorNetworks = (state:{ errorNetworkReducer: ErrorNetworkState }) => state.errorNetworkReducer
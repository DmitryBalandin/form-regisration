import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer, // измените на 'auth'
  },
})


export default store
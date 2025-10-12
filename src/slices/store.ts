import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import errorNetworkReducer from './errorsNetworkSlice'
const store = configureStore({
  reducer: {
    auth: authReducer, 
   errorNetworkReducer,
  },
})


export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

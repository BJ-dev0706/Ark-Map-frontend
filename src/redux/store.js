import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import manageSlice from './manageSlice'

export default configureStore({
  reducer: {
    auth: authSlice,
    manage: manageSlice
  },
})
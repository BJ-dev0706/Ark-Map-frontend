import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'auth',
  initialState: {
    UserData: {}
  },
  reducers: {
    SetUserData: (state, action) => {
      state.UserData= action.payload;
    },
    ClearUserData: (state) => {
      state.UserData= {};
    }
  },
})

// Action creators are generated for each case reducer function
export const SelectAuth = (state) => state.auth.UserData;

export const { SetUserData, ClearUserData } = counterSlice.actions

export default counterSlice.reducer;
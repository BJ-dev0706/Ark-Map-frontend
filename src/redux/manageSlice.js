import { createSlice } from '@reduxjs/toolkit'

export const manageSlice = createSlice({
  name: 'manage',
  initialState: {
    Users: [],
    Maps: []
  },
  reducers: {
    SetUsers: (state, action) => {
      console.log(state, action);
      state.Users= action.payload;      
    },
    SetMaps: (state, action) => {
      console.log(state, action);
      state.Maps= action.payload;      
    }
  },
})

export const SelectManage = (state) => state.manage;

export const { SetUsers, SetMaps } = manageSlice.actions

export default manageSlice.reducer;
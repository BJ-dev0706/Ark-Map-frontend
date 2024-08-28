import { createSlice } from '@reduxjs/toolkit'

export const manageSlice = createSlice({
  name: 'manage',
  initialState: {
    Users: [],
    Maps: [],
    loading: false
  },
  reducers: {
    SetUsers: (state, action) => {
      state.Users= action.payload;      
    },
    SetMaps: (state, action) => {
      state.loading = false;
      state.Maps= action.payload;      
    },
    SetLoading: (state) => {
      state.loading = true;
    }
  },
})

export const SelectManage = (state) => state.manage;

export const { SetUsers, SetMaps, SetLoading } = manageSlice.actions

export default manageSlice.reducer;
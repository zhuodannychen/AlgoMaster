import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "admin",
    isAdmin: false
  },
  reducers: {
    updateUserName: (state, action) => {
      console.log(action)
      state.username = action.payload.username
    },
    updateIsAdmin: (state, action) => {
      state.isAdmin = action.payload.isAdmin
    }
  }
})
export const { updateUserName, updateIsAdmin } = userSlice.actions
export default userSlice.reducer

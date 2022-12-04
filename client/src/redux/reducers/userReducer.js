import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: "admin",
    isAdmin: false
  },
  // reducers: {
  //   updateUserName: (state, action) => {
  //     state.username = action.username
  //   },
  //   updateIsAdmin: (state, action) => {
  //     state.isAdmin = action.isAdmin
  //   }
  // }
})

//export const { updateUserName, updateIsAdmin } = userSlice.actions
export default userSlice.reducer

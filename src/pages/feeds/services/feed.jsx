// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   getUser: false,
//   user: {
//     email: "",
//     name: ""
//   },
//   setUserData: {
//     email: "",
//     name: "",
//     password: ""
//   }
// }

// const userData = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     getUserInfo: (state, action) => {
//       state.user = action.payload
//       state.setUserData = action.payload
//       state.getUser = true
//     },
//     setUserInfo: (state, action) => {
//       action.payload.name === "name" ? 
//       state.setUserData.name = action.payload.value : 
//       action.payload.name === "email" ? 
//       state.setUserData.email = action.payload.value :
//       state.setUserData.password = action.payload.value
//     },
//     cancelSetUserInfo: (state) => {
//       state.setUserData = {
//         email: state.user.email,
//         name: state.user.name,
//         password: ""
//       }
//     },
//   }
// })

// export const user = userData.reducer;
// export const { getUserInfo, setUserInfo, cancelSetUserInfo } = userData.actions;
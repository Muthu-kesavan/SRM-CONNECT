import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isLoading: false,
    error: false,
    notifications: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state)=> {
            state.isLoading = true;
        },
        loginSuccess: (state, action)=> {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        loginFailed: (state)=> {
            state.isLoading = false;
            state.error = true;
        },
        logout: (state)=> {
            return initialState;
        },
        changeProfile: (state, action) => {
          state.currentUser = {
            ...state.currentUser,
            profilePicture: action.payload,
          };
    },
    following: (state, action) => {
        if (state.currentUser.following.includes(action.payload)) {
          state.currentUser.following.splice(
            state.currentUser.following.findIndex(
              (followingId) => followingId === action.payload
            )
          );
        } else {
          state.currentUser.following.push(action.payload);
        }
      },
      addNotification: (state, action) => {
        state.notifications.push(action.payload);
      },
      clearNotifications: (state) => {
        state.notifications = [];
      },
    },
});

export const { loginStart, loginSuccess, loginFailed, changeProfile, logout, following, addNotification, clearNotifications } = userSlice.actions;
export default userSlice.reducer;
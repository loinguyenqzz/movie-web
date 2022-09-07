import {createSlice} from '@reduxjs/toolkit';
import avatar from "../../assets/kindpng_4212275.png"

const authSlide = createSlice({
    name: "auth",
    initialState: {
        currentUser: {
            uid:"",
            accessToken: "",
            email: '',
            emailVerified: false,
            displayName: "",
            photoURL: avatar,
        },
        error: false,
        loading: false
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = false
        }, 
        loginStart: (state) => {
            state.loading = true
        }, 
        loginFailed : (state) => {
            state.error = true
        },
        logOut : (state) => {
            state.currentUser = {
                uid : '',
                email: '',
                emailVerified: false,
                accessToken: "",
                displayName: "",
                photoURL: avatar,
            }
        },
        updateInforUser : (state, action) => {
            state.currentUser = {
                ...state.currentUser,
                ...action.payload
            }
        },
        
    },
})

export const {loginSuccess, loginStart, loginFailed, logOut, updateInforUser} = authSlide.actions
export default authSlide.reducer

import {createSlice} from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState: {cartIsVisible: false, notification: null},
    reducers: {
        toggleCart(state) {
            state.cartIsVisible = !state.cartIsVisible
        },
        showNotifications(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message,
            }
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice
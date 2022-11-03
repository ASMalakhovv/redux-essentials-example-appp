import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";
import {RootState} from "../../app/store";

export const fetchNotifications = createAsyncThunk<void,void, {
    state: RootState
}>('notifications/fetchNotifications',async (arg, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    // @ts-ignore
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
        `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
})

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        allNotificationsRead(state, action) {
            state.forEach( notification => {
                // @ts-ignore
                notification.read = true;
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            // @ts-ignore
            state.push(...action.payload)
            state.forEach(notification => {
                // @ts-ignore
                notification.isNew = !notification.read
            })
            // @ts-ignore
            state.sort((a,b) => b.date.localeCompare(a.date))
        })
    }
})


// @ts-ignore
export const selectAllNotifications = (state: RootState) => state.notifications

export const { allNotificationsRead } = notificationsSlice.actions

export default notificationsSlice.reducer

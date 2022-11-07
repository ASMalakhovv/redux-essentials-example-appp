import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";
import {RootState} from "../../app/store";

const notificationsAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => b.date.localeCompare(a.date)
});

export const fetchNotifications = createAsyncThunk<void, void, {
    state: RootState
}>('notifications/fetchNotifications', async (arg, {getState}) => {
    const allNotifications = selectAllNotifications(getState())
    // @ts-ignore
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
    initialState: notificationsAdapter.getInitialState(),
    reducers: {
        allNotificationsRead(state, action) {
            Object.values(state.entities).forEach((notification: any) => {
                notification.read = true
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            // @ts-ignore
            notificationsAdapter.upsertMany(state, action.payload)
            Object.values(state.entities).forEach(notification => {
                notification.isNew = !notification.read
            })
        })
    }
})



export const { selectAll: selectAllNotifications } =
    notificationsAdapter.getSelectors((state: RootState) => state.notifications);

export const {allNotificationsRead} = notificationsSlice.actions

export default notificationsSlice.reducer

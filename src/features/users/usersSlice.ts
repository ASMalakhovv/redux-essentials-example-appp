import {createAsyncThunk, createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";
import {client} from "../../api/client";
import {RootState} from "../../app/store";

export type User = { id: string, name: string }

const usersAdapter = createEntityAdapter<User>();

const initialState:EntityState<User> = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
    }
})

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export default usersSlice.reducer
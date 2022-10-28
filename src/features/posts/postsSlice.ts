import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {sub} from "date-fns";

type Post = {
    id: string
    title: string
    content: string
    date: string
};

const initialState: Post[] = [
    {id: '1', title: 'First Post', content: 'Hello!', date: sub(new Date(), { minutes: 10 }).toISOString()},
    {id: '2', title: 'Second Post', content: 'More text', date: sub(new Date(), { minutes: 5 }).toISOString()}
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                state.push(action.payload);
            },
            prepare(title: string,content: string, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        userId
                    }
                }
            }
        },
        postUpdated(state, action: PayloadAction<Post>) {
            const {id, content, title} = action.payload;
            const existingPost = state.find(p => p.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    }
});

export const {postAdded, postUpdated} = postsSlice.actions

export default postsSlice.reducer;
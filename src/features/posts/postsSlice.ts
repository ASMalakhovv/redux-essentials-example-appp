import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {sub} from "date-fns";
import {Keys} from "./ReactionButtons";

export type Post = {
    id: string
    title: string
    content: string
    date: string
    reactions: {
        thumbsUp: number
        hooray: number
        heart: number
        rocket: number
        eyes: number
    }
};

const initialState: Post[] = [
    {
        id: '1',
        title: 'First Post',
        content: 'Hello!',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            eyes: 0,
            heart: 0,
            hooray: 0,
            rocket: 0,
            thumbsUp: 0
        }},
    {
        id: '2',
        title: 'Second Post',
        content: 'More text',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            eyes: 0,
            heart: 0,
            hooray: 0,
            rocket: 0,
            thumbsUp: 0
        }
    }
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action:PayloadAction<{id: string, reactionName: Keys}>) {
            const { id, reactionName } = action.payload;
            const existingPost = state.find(p => p.id ===  id)
            if (existingPost) {
                existingPost.reactions[reactionName] ++;
            }
        },
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
                        userId,
                        reactions: {
                            eyes: 0,
                            heart: 0,
                            hooray: 0,
                            rocket: 0,
                            thumbsUp: 0
                        }
                    }
                }
            }
        },
        postUpdated(state, action: PayloadAction<Omit<Post, 'reactions'>>) {
            const {id, content, title} = action.payload;
            const existingPost = state.find(p => p.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    }
});

export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

export default postsSlice.reducer;
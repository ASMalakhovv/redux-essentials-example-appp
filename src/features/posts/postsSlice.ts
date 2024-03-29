import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice, EntityState,
    nanoid,
    PayloadAction
} from "@reduxjs/toolkit";
import {Keys} from "./ReactionButtons";
import {RootState} from "../../app/store";
import {client} from "../../api/client";

export type RequestStatusSlice = 'idle' | 'loading' | 'succeeded' | 'failed'

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
    user: string
};

type InitialStatePostsSlice = {
    status: RequestStatusSlice
    error: string | null
}

const postsAdapter = createEntityAdapter<Post>({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState:EntityState<Post> & InitialStatePostsSlice = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

// THUNK
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost', async (initialPost:{ title: string, content: string, user: string }) => {
        const response = await client.post('/fakeApi/posts', initialPost)
        return response.data
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action: PayloadAction<{ id: string, reactionName: Keys }>) {
            const {id, reactionName} = action.payload;
            const existingPost = state.entities[id]
            if (existingPost) {
                existingPost.reactions[reactionName]++;
            }
        },
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                // state.entities.push(action.payload);
            },
            prepare(title: string, content: string, userId) {
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
                        },
                        user: nanoid(),
                    }
                }
            }
        },
        postUpdated(state, action: PayloadAction<Omit<Post, 'reactions'>>) {
            const {id, content, title} = action.payload;
            const existingPost = state.entities[id]
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            postsAdapter.upsertMany(state, action.payload)
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            // @ts-ignore
            state.error = action.error.message
        });
        builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
    }
});

export const {postAdded, postUpdated, reactionAdded} = postsSlice.actions

export default postsSlice.reducer;

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state:RootState, userId:string) => userId],
    (posts, userId) => posts.filter(post => post.user === userId)
)